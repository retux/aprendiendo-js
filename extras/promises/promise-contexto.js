let elemento

for (let index = 0; index < 100; index++) {
  // NO FUNCIONA
  // elemento = { marca: `Ford ${index}` }
  new Promise((resolve, reject) => {
    setTimeout(_ => {
      // FUNCIONA
      elemento = { marca: `Ford ${index}` }
      resolve()
    }, 1000)
  }).then(_ => {
    console.log(elemento)
  })
}
