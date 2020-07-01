const otroAsync = async _ => {
  return 'Entré 2'
}

const algoAsync = async _ => {
  console.log('Entré')
  const resultado = await otroAsync()
  console.log(resultado)
}

setInterval(_ => {
  algoAsync()
}, 5000)
