const init = new Date().toISOString()

console.log(`prog ini: ${init}`)

const generadordeTarea = (numeroTarea, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(_ =>{
      end = new Date().toISOString()
      console.log(`termino tarea: ${numeroTarea}: ${end}`)
      resolve()
    }, delay)
  })
}


// Recordar el then siempre retorna una promesa. Si esa promesa está vacía
// retorna una promesa vacía.
tarea1 = generadordeTarea(1, 3000)
//tarea2 = generadordeTarea(2, 3000)
tarea1.then(_ => {
  tarea2 = generadordeTarea(2, 3000)
  return tarea2
})
// tarea1.then(_ => {
//   end = new Date().toISOString()
//   console.log(`terminó tarea1: ${end}`)
// })

