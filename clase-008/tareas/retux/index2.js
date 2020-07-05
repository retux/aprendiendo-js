// App: segurola
// version: 0.0.3
// autor: retux
// ==============================================================================================
// Reescribo acá la tarea de la clase 008 (async/await), a ver si está un poco más sólido y se 
// basa menos en resultados de serendipity.
// Lee los archivos de autos desde el subdirectorio ./input y los procesa para 
//   calcular el precio de las pólizas de seguro. Los archivos de salida se escriben en el subdir
//   ./output. Solo los archivos de entrada .json son procesados.
//   Atenti, segurola requiere node >= 10.

const fs = require('fs')
const path = require('path')
const os = require('os')

const getListaArchivosdelDir = (dirPath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

const filtrarArchivos = (listadeArchivos, extension) => {
  // Quita archivos de un array que no contengan la extensión provista, retorna array filtrado.
  return listadeArchivos.filter((archivo) => { return archivo.endsWith(extension) })
}

const leerArchivo = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

const leerArchivoConAsync = async (filePath) => {
  return fs.promises.readFile(filePath)
}

const escribirArchivo = async (filePath, data) => {
  return fs.promises.writeFile(filePath, data)
}

async function procesarAutos(listadeAutos, archivoSalida, informeTotal) {
  // Recibe un array de obj autos y nombre de archivo para escribirlo en dir output.
  const objSalida = []
  for (let i=0; i<listadeAutos.length; i++) {
    coche = getCostoPoliza(listadeAutos[i])
    objSalida.push(coche)
    informeTotal.costoTotal += coche.costopoliza
    informeTotal.valorMercadoTotal += coche.valor
    informeTotal.totalAutomoviles++
  }
  try {
    await escribirArchivo(archivoSalida, JSON.stringify(objSalida, null, 2))
    console.log(`[info] Escrito archivo: ${archivoSalida}.`)
  } catch (error) {
    console.log(`[error] Ameo, no se pudo escribir el archivo: ${archivoSalida}. Atendéte.`)
  }
}

function getCostoPoliza(coche) {
  // Recibe un objeto auto, calcula su atributo valor (de póliza) y retorna
  // el objeto con ese nuevo atributo actualizado.
  // Este es el costo base de la poliza en esta compañia. 
  let costopolizaMensual = 1500
  let valorAutoCopetudo = 350000
  if (coche.fabricadoen <= 2000) { 
    costopolizaMensual *= 1.05
  } 
  if (coche.fabricadoen <= 1985) {
    costopolizaMensual *= 1.10
  } 
  if (coche.fabricadoen <= 1977) { 
    costopolizaMensual *= 1.30 
  }
  // Plus a coches de lujo con precios mayores a valorAutoCopetudo
  if (parseInt(coche.valor) >= valorAutoCopetudo) {
    costopolizaMensual *= 1.60
  }
  costopolizaMensual *= (parseFloat(coche.valor) / parseFloat(valorAutoCopetudo)) * 3
  coche.costopoliza = parseFloat(costopolizaMensual.toFixed(2)) 
  return coche
}


(async _ => {
  const informeTotal = { 
    'costoTotal': 0, 
    'valorMercadoTotal': 0,
    'totalAutomoviles': 0
  }
  console.log('[info] iniciando...')
  const directorioInput = path.join(__dirname, 'input')
  const directorioOutput = path.join(__dirname, 'output')
  let listadeArchivos = await getListaArchivosdelDir(directorioInput)
  listadeArchivos = await filtrarArchivos(listadeArchivos, '.json')
  for (let i=0; i<listadeArchivos.length; i++) {
    try {
      arrAutos = JSON.parse(await leerArchivoConAsync(path.join(directorioInput, listadeArchivos[i])))
      await procesarAutos(arrAutos, path.join(directorioOutput,listadeArchivos[i]), informeTotal)
      // console.log(`${listadeArchivos[i]}: ${arrAutos.length}`)
    } catch (error) {
      console.log(`[error] Abriendo archivo: ${listadeArchivos[i]}. ${error.message}`)
    }
  }
  try {
    escribirArchivo(path.join(directorioOutput, 'totales.json'), JSON.stringify(informeTotal, null, 2))
  } catch {
    console.log('[error] intentando escribir archivo de resultados.')
  }
  console.log('totales:')
  console.log(informeTotal)
 })()
