const start = new Date().toISOString()
console.log(start)

const generadorTareas = (numeroTarea, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(_ => {
      const finish = new Date().toISOString()
      console.log(`TAREA ${numeroTarea}: DONE ${finish}`)
      // resolve()
      reject(new Error('generador fallo'))
    }, delay)
  })
}

// EL THEN GENERA UN TRY/CATCH INVISIBLE
generadorTareas(1, 500).catch(error => {
  console.log(`generador estas bien???: ${error.message}`)
  throw error
}).then(_ => {
  throw new Error('Epa exploto todo')
}).catch(error => {
  console.log(`BONITO: ${error.message}`)
}).then(_ => {
  console.log('Pero no pasa nada, esta todo bien...')
  JSON.parse('hola = true')
}).catch(error => {
  console.log(`BONITO 2: ${error.message}`)
})
