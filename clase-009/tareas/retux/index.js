// chusmita: aplicación que te hace preguntas basándose en un template de entrada (./input/preguntas.tpl).
//  Los datos son escritos en ./var/chusmita.json y posteriormente pueden editarse con el menú.
// autor: retux

const readline = require('readline')
const path = require('path')
const os = require('os')
const common = require('./lib/common')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const prompt = async (pregunta) => {
  return new Promise((resolve, reject) => {
    rl.question(`${pregunta}`, (input) => resolve(input))
  })
}

const crearDirsinoExiste = async (dirPath) => {
  try {
    await common.archivoExiste('./var')
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`[info] el directorio ${dirPath} no existe. Creándolo...`)
      await common.crearDirectorio(dirPath)
    } else {
      throw error
    }
  }
}

const leerTemplate = async (filePath) => {
  let listadePreguntas
  try {
    // if (await common.archivoExiste(filePath)) {
    //   console.log('[info] Si si si, archivo .tpl existe!!')
    // }
    const template = await common.leerArchivo(filePath)
    listadePreguntas = JSON.parse(template)
  } catch (error) {
    console.log(`[error] No pude abrir el archivo preguntas.tpl o parsear el json: ${error.message}`)
  }
  return listadePreguntas
}

const recorrerPreguntas = async (listadePreguntas) => {
  let valor
  const toReturn = {}
  const entradas = Object.keys(listadePreguntas)
  for (let i = 0; i < entradas.length; i++) {
    valor = await prompt(entradas[i] + ' [' + listadePreguntas[entradas[i]] + '] ')
    if (valor.length > 0) {
      toReturn[entradas[i]] = valor
    } else {
      toReturn[entradas[i]] = listadePreguntas[entradas[i]]
    }
  }
  return toReturn
}

const guardarDatos = async (filePath, datos) => {
  try {
    await common.escribirArchivo(filePath, datos)
  } catch (error) {
    console.log(`[error] intentando guardar datos en ${filePath}. ${error.message}`)
  }
}

const editarDatos = async (archivodeDatos) => {
  const listadePreguntas = await leerTemplate(archivodeDatos)
  const objSalida = await recorrerPreguntas(listadePreguntas)
  await guardarDatos(archivodeDatos, JSON.stringify(objSalida, null, 2))
  console.log('done con editar datos.')
}

const imprimirAyuda = _ => {
  console.log(os.EOL + 'Opciones: ' + os.EOL)
  console.log('h  Imprime esta ayuda.')
  console.log('q  salir del programa.')
  console.log('e  editar datos del archivo.')
  console.log('p  imprimir datos de archivo.')
}

const imprimirDatos = async (filePath) => {
  const listadePreguntas = await leerTemplate(filePath)
  const entradas = Object.keys(listadePreguntas)
  console.log('')
  for (let i = 0; i < entradas.length; i++) {
    console.log(`${entradas[i]}: ${listadePreguntas[entradas[i]]}`)
  }
}

const salir = _ => {
  rl.close()
  process.exit(0)
}

(async _ => {
  console.clear()
  const ps1 = os.EOL + '.:chusmita:. (h para ayuda) > '
  let listadePreguntas
  const archivodeDatos = path.join(__dirname, 'var', 'chusmita.json')
  await crearDirsinoExiste(path.join(__dirname, 'var'))
  // Si el archivo ./var/chusmita.json no existe empezará haciendo las preguntas del template.
  try {
    await common.archivoExiste(path.join(archivodeDatos))
  } catch {
    console.log('[info] Voy a empezar haciéndote algunas preguntas.' + os.EOL)
    listadePreguntas = await leerTemplate(path.join(__dirname, 'input', 'preguntas.tpl'))
    const objSalida = await recorrerPreguntas(listadePreguntas)
    await guardarDatos(archivodeDatos, JSON.stringify(objSalida, null, 2))
  }
  while (true) {
    const comando = await prompt(ps1)
    switch (comando) {
      case 'h':
        imprimirAyuda()
        break
      case 'q':
        salir()
        break
      case 'e':
        await editarDatos(archivodeDatos)
        break
      case 'p':
        await imprimirDatos(archivodeDatos)
        break
      default:
        console.log('Opción inválida. Reintentá ameo por favor.')
    }
  }
})()
