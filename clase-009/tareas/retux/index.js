const readline = require('readline')
const path = require('path')
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
    if (await common.archivoExiste('./var')) {
      console.log('[info] directorio var existe.')
    }
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
    if (await common.archivoExiste(filePath)) {
      console.log('[info] Si si si, archivo .tpl existe!!')
    }
    const template = await common.leerArchivo(filePath)
    listadePreguntas = JSON.parse(template)
  } catch (error) {
    console.log(`[error] No pude abrir el archivo preguntas.tpl o parsear el json: ${error.message}`)
  }
  //console.log(listadePreguntas)
  return listadePreguntas
}

const recorrerPreguntas = async (listadePreguntas) => {
  const toReturn = {}
  const entradas = Object.entries(listadePreguntas)
  for (let i = 0; i < entradas.length; i++) {
    toReturn[entradas[i][0]] = await prompt(`${entradas[i][0]} `)
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

(async _ => {
  const ps1 = '.:chusmita:. >'
  let listadePreguntas
  const archivodeDatos = path.join(__dirname, 'var', 'chusmita.json')
  await crearDirsinoExiste(path.join(__dirname, 'var'))
  try {
    await common.archivoExiste(path.join(archivodeDatos))
  } catch {
    console.log('[debug] archivo var/chusmita.json no existe. Procesando preguntas del template.')
    console.log('[info] Voy a hacerte algunas preguntas')
    listadePreguntas = await leerTemplate(path.join(__dirname, 'input', 'preguntas.tpl'))
    const objSalida = await recorrerPreguntas(listadePreguntas)
    guardarDatos(archivodeDatos, JSON.stringify(objSalida, null, 2))
    console.log(objSalida)
  }
  //
  //
  const nombre = await prompt(ps1)
  console.log(`Hola ${nombre}`)
  rl.close()
})()
