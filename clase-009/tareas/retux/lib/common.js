// Common utilities
const fs = require('fs')

const crearDirectorio = async (dirPath) => {
  return fs.promises.mkdir(dirPath, { recursive: true })
}

const filtrarArchivos = (listadeArchivos, extension) => {
  // Quita archivos de un array que no contengan la extensión provista, retorna array filtrado.
  return listadeArchivos.filter((archivo) => { return archivo.endsWith(extension) })
}

const leerArchivo = async (filePath) => {
  return fs.promises.readFile(filePath)
}

const escribirArchivo = async (filePath, data) => {
  return fs.promises.writeFile(filePath, data)
}

// TODO Mover  lib common
const archivoExiste = async (filePath) => {
  return new Promise((resolve, reject) => {
    fs.access(filePath, fs.F_OK, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve(true)
      }
    })
  })
}

module.exports = {
  filtrarArchivos,
  leerArchivo,
  escribirArchivo,
  archivoExiste,
  crearDirectorio
}
