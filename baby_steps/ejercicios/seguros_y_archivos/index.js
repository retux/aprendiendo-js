// segurola: Lee los archivos de autos desde el subdirectorio ./input y los procesa para 
//   calcular el precio de las pólizas de seguro.
//   Querido @kaminoo, para que no te chives, te esribo todo en español y más te vale que
//   tengas todo en UTF-8 porque te voy a mandar caracteres extraños.
//   Pero tener en cuenta que lo que acá son archivos en otros sitios son ficheros. No sé si semejante
//   ambigüedad no va a embromar.

const fs = require('fs')
const path = require('path')


function getAutosDesdeEntrada (dirPath) {
  try {
    fs.readdir(dirPath, function(err, archivos) {
      if (err) {
        throw new Error('Ameo, fijate bien el diretorio.')
      }
      archivos.forEach(function(archivo) {
        if (/.*\.json$/.exec(archivo)) {
          // console.log(`found: ${dirPath}/${archivo}.`)
          try {
            fs.readFile(path.join(dirPath, archivo), 'utf8', function (err,datos) {
              if (err) {
                throw new Error(`Ameo, encontré un error al abrir ${archivo}. Fijate bien y volvé después.`)
              }
              try {
                const objdesdeArchivo = JSON.parse(datos)
                calcularCostoPoliza(objdesdeArchivo, archivo)
              }
              catch (error) {
                console.log(error.message)
              }
              
            })
          }
          catch (error) {
            console.log(error.message)
          }
        }
      })
    })
  }
  catch (error) {
    console.log(error.message)
  }
}

function calcularCostoPoliza(listadeAutos, archivoSalida) {
  const objSalida = []
  listadeAutos.forEach(function(coche) {
    if (coche.fabricadoen <= 2000) { 
      precioFinal = coche.valor * 1.05
    } 
    if (coche.fabricadoen <= 1985) {
      precioFinal = coche.valor * 1.10
    } 
    if (coche.fabricadoen <= 1977) { 
      precioFinal = coche.valor * 1.30 
    }
    coche.costoseguro = precioFinal
    objSalida.push(coche)
    fs.writeFileSync(path.join(__dirname, 'output', archivoSalida), JSON.stringify(objSalida, null, 2))
  })
}

function main() {
  getAutosDesdeEntrada(path.join(__dirname, 'input'))
  console.log('[info] Si suerte has tenido, el directorio output ver debes.')
}

main()

