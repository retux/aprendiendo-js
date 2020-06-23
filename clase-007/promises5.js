const start = new Date().toISOString()
console.log(start)

const generadorTareas = (numeroTarea, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(_ => {
      const finish = new Date().toISOString()
      console.log(`TAREA ${numeroTarea}: DONE ${finish}`)
      resolve(`RESULTADO TAREA ${numeroTarea}`)
    }, delay)
  })
}

const t1 = generadorTareas(1, 1000)
const t2 = generadorTareas(2, 2000)
const t3 = generadorTareas(3, 500)
const t4 = generadorTareas(4, 1500)
const t5 = generadorTareas(5, 2500)

// t1.then(_ => {
//   return t2
// }).then(_ => {
//   return t3
// }).then(_ => {
//   return t4
// }).then(_ => {
//   return t5
// }).then(_ => {
//   console.log(results)
//   const finish = new Date().toISOString()
//   console.log(`DONE ${finish}`)
// })

const todas = Promise.all([
  t1,
  t2,
  t3,
  t4,
  t5
])

todas.then(results => {
  console.log(results)
  const finish = new Date().toISOString()
  console.log(`DONE ${finish}`)
})
