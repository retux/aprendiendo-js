class Vehiculo {
  constructor () {
    this.ruedas = true
    this.volante = 1
    this.motor = '8v'
  }
}

const vehiculo = new Vehiculo()
vehiculo.patente = 'ABC123'
console.log(JSON.stringify(vehiculo))

const vehiculo2 = new Vehiculo()
vehiculo2.patente = 'DEF456'
console.log(JSON.stringify(vehiculo2))

// NO USAR __proto__: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto
// Vehiculo.prototype.localidad = 'AMBA'

// console.log(JSON.stringify(vehiculo), JSON.stringify(Object.getPrototypeOf(vehiculo)))
// console.log(JSON.stringify(vehiculo2), JSON.stringify(Object.getPrototypeOf(vehiculo2)))
// console.log(vehiculo.ruedas, vehiculo.volante, vehiculo.localidad)
