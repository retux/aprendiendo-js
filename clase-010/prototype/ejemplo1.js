// Las functions tiene prototype
function Vehiculo () {
  this.ruedas = true
  this.volante = 1
  this.motor = '8v'
}

// Invocando new sobre ellas, se crea un objeto cuyo constructor es la funcion dada
const vehiculo = new Vehiculo()
console.log(JSON.stringify(vehiculo))
