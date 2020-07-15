const vehiculo = {
  ruedas: true,
  volante: 1,
  motor: '8v'
}

const auto = Object.create(vehiculo)
auto.ruedas = 4

console.log(auto.ruedas, auto.volante, auto.motor)

// delete auto.ruedas
// console.log(auto.ruedas, auto.volante, auto.motor)

// delete auto.ruedas
// console.log(auto.ruedas, auto.volante, auto.motor)
