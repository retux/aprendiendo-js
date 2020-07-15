function Vehiculo () {
  this.ruedas = true
  this.volante = 1
  this.motor = '8v'
}

Vehiculo.prototype.tieneRuedas = function () {
  console.log(`Tiene ruedas: ${!!this.ruedas}`)
}

function Auto () {
  this.paragolpes = 2
}

Auto.prototype = new Vehiculo()

const auto = new Auto()
console.log(auto.ruedas, auto.paragolpes)
auto.tieneRuedas()
