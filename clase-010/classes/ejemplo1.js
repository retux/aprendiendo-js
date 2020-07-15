class Vehiculo {
  constructor () {
    this.ruedas = true
    this.volante = 1
    this.motor = '8v'
  }
}

const vehiculo = new Vehiculo(2)
console.log(JSON.stringify(vehiculo))
