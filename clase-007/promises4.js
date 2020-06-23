// Propagando resultados: anexar
// Promise.resolve({ marca: 'Ford' }).then(auto => {
//   console.log(auto)
//   auto.seguro = 1000
//   return Promise.resolve(auto)
// }).then(auto => {
//   console.log(auto)
// })

// Propagando resultados: nuevo objeto
// Promise.resolve({ marca: 'Ford' }).then(auto => {
//   console.log(auto)
//   const toReturn = {
//     auto,
//     seguro: 100
//   }
//   return Promise.resolve(toReturn)
// }).then(obj => {
//   console.log(obj)
// })

// Propagando resultados: contexto
const context = {
  auto: {
    marca: 'Ford'
  }
}
Promise.resolve(context).then(context => {
  context.seguro = 1000
  return Promise.resolve(context)
}).then(context => {
  delete context.seguro
  console.log(context)
})
