class Vehiculo {
  constructor () {
    this.ruedas = true
    this.volante = 1
    this.motor = '8v'
  }

  tieneRuedas () {
    console.log(`Tiene ruedas: ${!!this.ruedas}`)
  }
}

class Auto extends Vehiculo {
  constructor () {
    super()
    this.ruedas = 4
  }
}

const vehiculo = new Vehiculo()
console.log(vehiculo)

const auto = new Auto()
console.log(auto)
auto.tieneRuedas()
