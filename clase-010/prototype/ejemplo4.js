function Vehiculo () {
  this.ruedas = true
  this.volante = 1
  this.motor = '8v'
}

Vehiculo.prototype.tieneRuedas = function () {
  console.log(`Tiene ruedas: ${!!this.ruedas}`)
}

const vehiculo = new Vehiculo()
vehiculo.tieneRuedas()

vehiculo.ruedas = false
vehiculo.tieneRuedas()
