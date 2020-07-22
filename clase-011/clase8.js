const comer = async (empanada) => {
  console.log(`invoque ${empanada}`)
  return new Promise((resolve, reject) => {
    setTimeout(_ => {
      console.log(`comer ${empanada}`)
      resolve()
    }, Math.random() * 10000)
  })
}

;(async _ => {
  const empanadas = [
    'carne',
    'pollo',
    'jyq'
  ]
  for (let i = 0; i < empanadas.length; i++) {
    const empanada = empanadas[i]
    comer(empanada)
  }
  await comer('cebolla')
})()
