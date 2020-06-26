const maxIterador = 10000
let elemento
let promise = Promise.resolve()

for (let index = 0; index < maxIterador; index++) {
  // promise = promise.then(_ => {
    new Promise((resolve, reject) => {
      elemento = { marca: `Ford ${index}` }
      resolve()
    // })
  }).then(_ => {
    console.log(elemento)
  })
}
