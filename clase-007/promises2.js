const start = new Date().toISOString()
console.log(start)

const generadorTareas = (numeroTarea, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(_ => {
      const finish = new Date().toISOString()
      console.log(`TAREA ${numeroTarea}: DONE ${finish}`)
      resolve()
    }, delay)
  })
}

// const tarea1 = generadorTareas(1, 1000)

// tarea1.then(_ => {
//   const tarea2 = generadorTareas(2, 1000)
//   return tarea2
// })

generadorTareas(1, 1000).then(_ => {
  return generadorTareas(2, 1000)
})
