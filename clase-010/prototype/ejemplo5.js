// Las arrow functions, no tienen prototype
const Vehiculo = _ => {
  this.ruedas = true
  this.volante = 1
  this.motor = '8v'
}

const vehiculo = new Vehiculo()
console.log(JSON.stringify(vehiculo))
