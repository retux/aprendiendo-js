// const fs = require('fs').promises;

// (async _ => {
//   try {
//     const data = await fs.readFile('./autos.json') // need to be in an async function
//     const autos = JSON.parse(data)
//     console.log(autos) // the contents of file1.js
//   } catch (error) {
//     console.log(error)
//   }
// })()

const fs = require('fs')

let totalAPagar = 0
let autos = []

const porcentajeSeguroMarca = {
  "Renault": 0.8,
  "Ford": 1,
  "Chevrolet": 0.5
}

const segurosDeAutos = (marca) => porcentajeSeguroMarca[marca]

async function readFile (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

(async _ => {
  const stringObjeto = await readFile('./autos.json')
  autos = JSON.parse(stringObjeto)
  showPrecios(autos)
})().catch(err => { console.log(err) })

function writeFile (path, objetoString) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, objetoString, function (err) {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

async function Llamador (path, objetoString) {
  const result = await writeFile(path, objetoString)
  return result
}

function calcularSeguro (auto) {
  let vaAPagar = 1000
  const porcentaje = segurosDeAutos(auto.marca)
  vaAPagar *= porcentaje
  return vaAPagar
}

function showPrecios (autos) {
  if (autos.length) {
    for (const auto of autos) {
      const seguro = calcularSeguro(auto)
      console.log(`El seguro de ${auto.marca} ${auto.modelo} es:$`, seguro)
      auto.seguro = seguro
      totalAPagar += seguro
    }
    const objetoString = JSON.stringify(autos, null, 4)
    Llamador('./autos.json', objetoString).catch(result => { console.log(result) })

    console.log(`El Total a pagar es de:$${totalAPagar}`)
  } else {
    console.log('No hay autos a calcular')
  }
}
