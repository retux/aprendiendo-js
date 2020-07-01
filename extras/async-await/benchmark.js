const fs = require('fs').promises
const path = require('path')
const crypto = require('crypto')
const { parse } = require('path')

let archivosCreados = 0
const archivosMaximosACrear = 100000
const maximaProfundidadDirectorios = 5
const directorioSalida = path.join(process.cwd(), 'input-randomico')

const incrementarArchivosCreados = _ => {
  archivosCreados++
  process.stdout.cursorTo(0)
  process.stdout.write(`${archivosCreados} / ${archivosMaximosACrear}`)
}

const archivoDataRandom = _ => {
  return {
    id: archivosCreados,
    producto: crypto.randomBytes(parseInt(Math.random() * 10000) + 1).toString('hex'),
    total: parseFloat((Math.random() * 1000).toFixed(2))
  }
}

const archivoDirectorioRandomico = async (directorioActual) => {
  if (archivosCreados < archivosMaximosACrear) {
    const random = Math.random()
    if (random < 0.80) {
      incrementarArchivosCreados()
      const archivoRandom = crypto.randomBytes(parseInt(Math.random() * 20) + 1).toString('hex')
      const archivoPathAbsoluto = path.join(directorioActual, `${archivoRandom}.json`)
      const archivoData = archivoDataRandom()
      await fs.mkdir(directorioActual, { recursive: true })
      await fs.writeFile(archivoPathAbsoluto, Buffer.from(JSON.stringify(archivoData, null, 4)))
      await archivoDirectorioRandomico(directorioActual)
    } else {
      const profundidad = path.relative(directorioSalida, directorioActual).split(path.sep).length
      if (random < 0.90 && profundidad < maximaProfundidadDirectorios) {
        const directorioRandom = crypto.randomBytes(parseInt(Math.random() * 20)).toString('hex')
        const directorioPathAbsoluto = path.join(directorioActual, directorioRandom)
        await archivoDirectorioRandomico(directorioPathAbsoluto)
      } else if (profundidad > 1) {
        await archivoDirectorioRandomico(path.join(directorioActual, '..'))
      } else {
        await archivoDirectorioRandomico(directorioActual)
      }
    }
  } else {
    process.stdout.cursorTo(0)
    console.log(`Creados ${archivosMaximosACrear} archivos randómicos`)
  }
}

;(async _ => {
  await fs.rmdir(directorioSalida, { recursive: true })
  await archivoDirectorioRandomico(directorioSalida)
})()
