const start = new Date().toISOString()
console.log(start)

const tarea1 = new Promise((resolve, reject) => {
  setTimeout(_ => {
    console.log('TAREA 1: DONE')
    const finish = new Date().toISOString()
    console.log(`TAREA 1 (ALT): ${finish}`)
    resolve()
  }, 1000)
})

const tarea2 = new Promise((resolve, reject) => {
  setTimeout(_ => {
    console.log('TAREA 2: DONE')
    const finish = new Date().toISOString()
    console.log(`TAREA 2 (ALT): ${finish}`)
    resolve()
  }, 1000)
})

tarea1.then(_ => {
  console.log('TAREA 1: FINISH')
  const finish = new Date().toISOString()
  console.log(`TAREA 1: ${finish}`)
  return tarea2
  // Si yo no devuelvo una promise, Javascript AUTOMATIGAMENTE me devuelve un Promise.resolve() hacia afuera
}).then(_ => {
  console.log('TAREA 2: FINISH')
  const finish = new Date().toISOString()
  console.log(`TAREA 2: ${finish}`)
})

// tarea2.then(_ => {
//   console.log('Termino la tarea 2')
//   const finish = new Date().toISOString()
//   console.log(finish)
// })
