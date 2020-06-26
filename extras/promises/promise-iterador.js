const maxIterador = 100000
const elementos = []
let promise = Promise.resolve()
for (let index = 0; index < maxIterador; index++) {
  elementos.push({ nombre: `elemento ${index}` })
}
// elementos.forEach(elemento => {
let elemento

for (let iterador = 0; iterador < elementos.length; iterador++) {
  elemento = elementos[iterador]
  promise = promise.then(_ => {
    return new Promise((resolve, reject) => {
      setTimeout(_ => {
        console.log(elemento)
        console.log(`Promise ${new Date().toISOString()}`)
        resolve()
      }, 1000)
    })
  })
}
// })
