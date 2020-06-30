const calcularSeguro = async (auto) => {
  return 1000
}

(async _ => {
  const auto = { marca: 'Ford' }
  auto.seguro = await calcularSeguro(auto)
  console.log(auto)
})()
