const fsp = require('fs').promises
const path = require('path')

const activarLogs = true

/**
 * Procesamiento completo de los autos.
 * 
 * @param {*} config 
 */
const procesarTodosLosAutos = async (config) => {
  let totalSeguros = 0

  // Procesamiento uno por uno de los archivos de entrada...
  const rutas = await fsp.readdir(config.directorioEntrada)
  for (let i = 0; i < rutas.length; i++) {
    const rutaEntrada = path.join(config.directorioEntrada, rutas[i])
    try {
      // ...esperando un auto a procesar en cada uno
      const auto = await procesarAuto(rutaEntrada)
      totalSeguros += auto.seguro

      const rutaSalida = path.join(config.directorioSalida, rutas[i])
      guardarResultado(rutaSalida, JSON.stringify(auto))

    } catch(error) {
      activarLogs && console.log(`Error al procesar ${rutaEntrada} ->`, error.message)
    }
  }

  const rutaTotales = path.join(config.directorioSalida, config.archivoTotal)
  guardarResultado(rutaTotales, totalSeguros)
}

/**
 * Procesamiento completo de un auto.
 * -> Leer de archivo y calcular su seguro
 * 
 * @param {*} ruta 
 */
const procesarAuto = async (ruta, contexto) => {
  const data = await fsp.readFile(ruta)
  const auto = JSON.parse(data)
  auto.seguro = calcularSeguro(auto)

  activarLogs && console.log(`Auto procesado desde ${ruta}`)

  return auto
}

/**
 * Calculo del seguro de un auto.
 * 
 * @param {*} auto 
 */
const calcularSeguro = (auto) => {
  
  if (!auto.hasOwnProperty('marca') || !auto.hasOwnProperty('año')) {
    throw new Error(`Al auto le falta marca y/o año.`)
  }
  
  let valor = 1000

  switch (auto.marca) {
    case 'Peugeot':
    case 'Citroën':
      valor *= 1.1
      break
    case 'Audi':
    case 'BMW':
      valor *= 2
      break
  }

  if (auto.año < 2015) {
    valor += (2015 - auto.año) * 100
  }

  return valor
}

/**
 * Guardado de resultados en salida.
 * 
 * @param {*} ruta 
 * @param {*} datos 
 */
const guardarResultado = (ruta, datos) => {
  fsp.writeFile(ruta, datos)
  activarLogs && console.log(`Guardando datos en ${ruta} ->`, datos)
}

/**
 * Normalizacion de una ruta a directrorio/archivo.
 * 
 * @param {*} ruta 
 */
const normalizarRuta = (ruta) => {
  const rutaNormalizada = path.normalize(ruta)
  return path.isAbsolute(rutaNormalizada) ? rutaNormalizada : path.join(process.cwd(), rutaNormalizada)
}


//******************************************************************//
//*****                     Main function                      *****//
(async _ => {

  const config = {
    directorioEntrada: normalizarRuta(process.argv[2]),
    directorioSalida: normalizarRuta(process.argv[3]),
    archivoTotal: process.argv[4] ? process.argv[4] : 'seguro.txt'
  }

  procesarTodosLosAutos(config)

})()
