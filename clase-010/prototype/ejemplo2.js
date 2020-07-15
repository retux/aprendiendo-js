function Vehiculo () {
  this.ruedas = true
  this.volante = 1
  this.motor = '8v'
}

const vehiculo = new Vehiculo()
console.log(JSON.stringify(vehiculo))

vehiculo.ruedas = false
vehiculo.paragolpes = 2
console.log(JSON.stringify(vehiculo))
