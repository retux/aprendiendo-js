const fs = require('fs').promises
const path = require('path')
let totalOrdenesCompra = 0

const start = new Date()
let archivosProcesados = 0
const incrementarArchivosProcesados = _ => {
  archivosProcesados++
  process.stdout.cursorTo(0)
  process.stdout.write(`ASYNC/AWAIT => ARCHIVOS PROCESADOS: ${archivosProcesados}`)
  process.stdout.cursorTo(0)
}

const memoryFootprint = _ => {
  const memory = process.memoryUsage()
  const profiling = []
  Object.keys(memory).forEach(memoryKey => {
    profiling.push(`${memoryKey.toUpperCase()}: ${(memory[memoryKey] / 1024 / 1024).toFixed(2)}MB`)
  })
  return profiling.join(' | ')
}

const recorrerDirectorio = async (pathDirectorio) => {
  const paths = await fs.readdir(pathDirectorio)
  for (let index = 0; index < paths.length; index++) {
    const pathAbsoluto = path.join(pathDirectorio, paths[index])
    try {
      await procesarPath(pathAbsoluto)
    } catch (_) {
    }
  }
}

const validarOrdenCompra = async (pathAbsoluto) => {
  if (pathAbsoluto.endsWith('.json')) {
    const data = await fs.readFile(pathAbsoluto)
    const ordenCompra = JSON.parse(data)
    if (!ordenCompra.hasOwnProperty('id')) {
      throw new Error('Orden es inválida: falta id')
    } else if (!(ordenCompra.producto && ordenCompra.producto.length)) {
      throw new Error('Orden es inválida: falta producto')
    } else if (!ordenCompra.hasOwnProperty('total')) {
      throw new Error('Orden es inválida: falta total')
    } else {
      procesarOrdenCompra(ordenCompra)
    }
  }
  throw new Error(`No es un path de orden valida: ${pathAbsoluto}`)
}

const procesarOrdenCompra = async (ordenCompra) => {
  incrementarArchivosProcesados()
  totalOrdenesCompra += ordenCompra.total
}

const procesarPath = async (pathAbsoluto) => {
  const stats = await fs.stat(pathAbsoluto)
  if (stats.isDirectory()) {
    return recorrerDirectorio(pathAbsoluto)
  } else if (stats.isFile()) {
    return validarOrdenCompra(pathAbsoluto)
  }
}

(async _ => {
  try {
    const ordenesPath = path.normalize(process.argv[2])
    const ordenesPathAbsoluto = path.isAbsolute(ordenesPath) ? ordenesPath : path.join(process.cwd(), ordenesPath)
    await procesarPath(ordenesPathAbsoluto)
    process.stdout.cursorTo(0)
    console.log(`ASYNC/AWAIT => TOTAL ORDENES DE COMPRA: ${totalOrdenesCompra.toFixed(2)} (${new Date().getTime() - start.getTime()} ms, ${memoryFootprint()})`)
  } catch (error) {
    process.stdout.cursorTo(0)
    console.log(`ERROR: ${error.message}`)
  }
})()
