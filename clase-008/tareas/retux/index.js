// App: segurola
// version: 0.0.1
// autor: retux
// ==============================================================================================
// Lee los archivos de autos desde el subdirectorio ./input y los procesa para 
//   calcular el precio de las pólizas de seguro. Los archivos de salida se escriben en el subdir
//   ./output. Solo los archivos de entrada .json son procesados.
//   Reescritura de la tarea de la clase 4 usando async/await.
//   Atenti, segurola requiere node >= 10.

const fs = require('fs')
const path = require('path')
const { arch } = require('os')


function getArchivosdelDir(dirPath) {
  let jsonsArchivos
  try {
    jsonsArchivos = fs.promises.readdir(dirPath)
    return jsonsArchivos
  } catch (error) {
    console.log(`[error] Ameo algo salió mal: ${error.message}`)
  }
}

async function filtrarArchivos(listadeArchivos, extension) {
  // Quita archivos de un array que no contengan la extensión provista, retorna array filtrado.
  listadeArchivos = await listadeArchivos.filter((archivo) => { return archivo.endsWith(extension) })
  return listadeArchivos
}

async function procesarArchivojson(pathArchivo) {
  // Lee json del fs y devuelve la representación en un objeto.
  try {
    const jsonDatos = await fs.promises.readFile(pathArchivo)
    const objdesdeArchivo = JSON.parse(jsonDatos)
    return objdesdeArchivo  
  } catch (error) {
    console.log(`[error] Ameo, hubo un error al intentar abrir json: ${error.message}. Archivo descartado.`)
  }
}  

async function procesarInput(directorioInput, directorioOutput = path.join(__dirname, 'output')) {
  // Recorre el directorio input y despacha el procesamiento de cada archivo.
  let listadeArchivos = await getArchivosdelDir(directorioInput)
  listadeArchivos = await filtrarArchivos(listadeArchivos, '.json')
  for (let i=0; i<listadeArchivos.length; i++) {
    let arrAutos = await procesarArchivojson(path.join(directorioInput, listadeArchivos[i]))
    await procesarAutos(arrAutos, path.join(directorioOutput,listadeArchivos[i]))  
  }
}

async function procesarAutos(listadeAutos, archivoSalida) {
  // Recibe un array de obj autos y nombre de archivo para escribirlo en dir output.
  const objSalida = []
  for (let i=0; i<listadeAutos.length; i++) {
    objSalida.push(getCostoPoliza(listadeAutos[i]))
  }
  console.log(`[info] Escrito archivo: ${archivoSalida}.`)
  try {
    fs.promises.writeFile(archivoSalida, JSON.stringify(objSalida, null, 2))
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

// TODO: USAR ESTA FUNCION PARA CALCULO DE TOTALES
async function crearListadesdeArchivos(directorio) {
  //Recibe path de directorio input y devuelve array con todos los objetos que encuentre
  let arrToReturn = []
  let listadeArchivos = await getArchivosdelDir(directorio)
  listadeArchivos = await filtrarArchivos(listadeArchivos, '.json')
  for (let i=0; i<listadeArchivos.length; i++) {
    try {
      //console.log('[debug] Abriendo: ' + path.join(directorio, listadeArchivos[i]))
      const jsonDatos = await fs.promises.readFile(path.join (directorio, listadeArchivos[i]))
      const objdesdeArchivo = JSON.parse(jsonDatos)
      arrToReturn = arrToReturn.concat(objdesdeArchivo)
    }
    catch (error) {
      console.log(`[error] Ameo, fijate bien los json, algo está mal con ellos: ${error.message} `)
    }
  }
  return arrToReturn
}

function calculaTotales (listaConsolidada, directorioSalida) {
  const informeTotal = { 
    'costoTotal': 0, 
    'valorMercadoTotal': 0,
    'totalAutomoviles': 0
  }
  informeTotal.totalAutomoviles = listaConsolidada.length
  for (let i=0; i<listaConsolidada.length; i++) {
    informeTotal.costoTotal += listaConsolidada[i].costopoliza
    informeTotal.valorMercadoTotal += listaConsolidada[i].valor
  }
  try {
    fs.promises.writeFile(path.join(directorioSalida, 'totales.json'), JSON.stringify(informeTotal, null, 2))
  } catch (error) {
    console.log(`[error] Ameo, error al escribir archivo de totales. Vayan a buscar a retux.: ${error.message}`)
  }
}

async function main() {
  const directorioInput = path.join(__dirname, 'input')
  const directorioOutput = path.join(__dirname, 'output')
  // Primero procesa archivos individuales y calcula póliza de cada coche.
  await procesarInput(directorioInput)
  console.log('[info] Calculando totales...')
  // Luego calcula totales
  const listaObjAutos = await crearListadesdeArchivos(directorioOutput)
  calculaTotales(listaObjAutos, directorioOutput)
  console.log('')
  console.log(`[info] Cantidad de coches procesados: ${listaObjAutos.length}`)
  console.log('[info] Joven Luke, tu destino es claro, el directorio output ver debes. Archivo totales.json totales contiene.')
}

main()
