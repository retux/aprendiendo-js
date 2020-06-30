const fs = require('fs').promises
const path = require('path')
let totalOrdenesCompra = 0

const start = new Date()
let archivosProcesados = 0
const incrementarArchivosProcesados = _ => {
  archivosProcesados++
  process.stdout.cursorTo(0)
  process.stdout.write(`PROMISES    => ARCHIVOS PROCESADOS: ${archivosProcesados}`)
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

const recorrerDirectorio = (pathDirectorio) => {
  return fs.readdir(pathDirectorio).then(paths => {
    let promise = Promise.resolve()
    paths.forEach(pathRelativo => {
      const pathAbsoluto = path.join(pathDirectorio, pathRelativo)
      promise = promise.then(_ => {
        return procesarPath(pathAbsoluto)
      })
    })
    return promise
  })
}

const validarOrdenCompra = (pathAbsoluto) => {
  if (pathAbsoluto.endsWith('.json')) {
    return fs.readFile(pathAbsoluto).then(data => {
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
    })
  }
  throw new Error(`No es un path de orden valida: ${pathAbsoluto}`)
}

const procesarOrdenCompra = (ordenCompra) => {
  incrementarArchivosProcesados()
  totalOrdenesCompra += ordenCompra.total
}

const procesarPath = (pathAbsoluto) => {
  return fs.stat(pathAbsoluto).then(stats => {
    if (stats.isDirectory()) {
      return recorrerDirectorio(pathAbsoluto)
    } else if (stats.isFile()) {
      return validarOrdenCompra(pathAbsoluto)
    }
  }).catch(_ => {
  })
}

const ordenesPath = path.normalize(process.argv[2])
const ordenesPathAbsoluto = path.isAbsolute(ordenesPath) ? ordenesPath : path.join(process.cwd(), ordenesPath)
procesarPath(ordenesPathAbsoluto).then(_ => {
  process.stdout.cursorTo(0)
  console.log(`PROMISES    => TOTAL ORDENES DE COMPRA: ${totalOrdenesCompra.toFixed(2)} (${new Date().getTime() - start.getTime()} ms, ${memoryFootprint()})`)
}).catch(error => {
  process.stdout.cursorTo(0)
  console.log(`ERROR: ${error.message}`)
})
