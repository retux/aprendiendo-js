const fs = require('fs')
const path = require('path')
let totalOrdenesCompra = 0

const start = new Date()
let archivosProcesados = 0
const incrementarArchivosProcesados = _ => {
  archivosProcesados++
  process.stdout.cursorTo(0)
  process.stdout.write(`CALLBACKS   => ARCHIVOS PROCESADOS: ${archivosProcesados}`)
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

const recorrerDirectorio = (pathDirectorio, callback) => {
  fs.readdir(pathDirectorio, (error, paths) => {
    if (error) {
      callback(error)
    } else {
      const maxPaths = paths.length
      let currentPaths = 0
      paths.forEach((pathRelativo, pathIndex) => {
        const pathAbsoluto = path.join(pathDirectorio, pathRelativo)
        // setTimeout(_ => {
          procesarPath(pathAbsoluto, (error) => {
            currentPaths++
            if (error && error.code === 'EMFILE' && error.errno === -24) {
              callback(error)
            } else if (maxPaths === currentPaths) {
              callback()
            }
          })
        // }, pathIndex)
      })
    }
  })
}

const validarOrdenCompra = (pathAbsoluto, callback) => {
  if (pathAbsoluto.endsWith('.json')) {
    fs.readFile(pathAbsoluto, (error, data) => {
      try {
        if (error) {
          callback(error)
        } else {
          const ordenCompra = JSON.parse(data)
          if (!ordenCompra.hasOwnProperty('id')) {
            throw new Error('Orden es inválida: falta id')
          } else if (!(ordenCompra.producto && ordenCompra.producto.length)) {
            throw new Error('Orden es inválida: falta producto')
          } else if (!ordenCompra.hasOwnProperty('total')) {
            throw new Error('Orden es inválida: falta total')
          } else {
            procesarOrdenCompra(ordenCompra)
            callback()
          }
        }
      } catch (error) {
        callback(error)
      }
    })
  } else {
    callback(new Error(`No es un path de orden valida: ${pathAbsoluto}`))
  }
}

const procesarOrdenCompra = (ordenCompra) => {
  incrementarArchivosProcesados()
  totalOrdenesCompra += ordenCompra.total
}

const procesarPath = (pathAbsoluto, callback) => {
  fs.stat(pathAbsoluto, (error, stats) => {
    if (error) {
      callback(error)
    } else {
      if (stats.isDirectory()) {
        return recorrerDirectorio(pathAbsoluto, callback)
      } else if (stats.isFile()) {
        return validarOrdenCompra(pathAbsoluto, callback)
      }
    }
  })
}

const ordenesPath = path.normalize(process.argv[2])
const ordenesPathAbsoluto = path.isAbsolute(ordenesPath) ? ordenesPath : path.join(process.cwd(), ordenesPath)
procesarPath(ordenesPathAbsoluto, error => {
  if (!error) {
    process.stdout.cursorTo(0)
    console.log(`CALLBACKS   => TOTAL ORDENES DE COMPRA: ${totalOrdenesCompra.toFixed(2)} (${new Date().getTime() - start.getTime()} ms, ${memoryFootprint()})`)
  } else {
    process.stdout.cursorTo(0)
    console.log(`ERROR: ${error.message}`)
    process.exit(1) // Fuerzo la terminación del programa dada el gran paralelismo y posibilidad de mostrar un error muchisimas veces
  }
})
