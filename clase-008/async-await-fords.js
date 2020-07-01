const calcularSeguro = async (auto) => {
  return 1000
}

(async _ => {
  const autos = [
    { marca: 'Ford' },
    { marca: 'Renault' },
    { marca: 'Chevrolet' }
  ]
  // autos.forEach(async auto => {
  for (let index = 0; index < autos.length; index++) {
    const auto = autos[index]
    auto.seguro = await calcularSeguro(auto)
    console.log(auto)
  }
  // })
  console.log('Termine')
})()
