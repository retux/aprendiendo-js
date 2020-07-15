function Vehiculo () {
  this.ruedas = true
  this.volante = 1
  this.motor = '8v'
}

const vehiculo = new Vehiculo()
vehiculo.patente = 'ABC123'
// console.log(JSON.stringify(vehiculo))

const vehiculo2 = new Vehiculo()
vehiculo2.patente = 'DEF456'
// console.log(JSON.stringify(vehiculo2))

// NO USAR __proto__: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto
Vehiculo.prototype.localidad = 'AMBA'

// console.log(JSON.stringify(vehiculo), JSON.stringify(Object.getPrototypeOf(vehiculo)))
// console.log(JSON.stringify(vehiculo2), JSON.stringify(Object.getPrototypeOf(vehiculo2)))
console.log(`A 1: ${vehiculo.localidad}`)
console.log(`A 2: ${vehiculo2.localidad}`)

vehiculo.localidad = 'CABA'
console.log(`B 1: ${vehiculo.localidad}`)
console.log(`B 2: ${vehiculo2.localidad}`)

delete vehiculo.localidad
console.log(`C 1: ${vehiculo.localidad}`)
console.log(`C 2: ${vehiculo2.localidad}`)

delete Vehiculo.prototype.localidad
console.log(`D 1: ${vehiculo.localidad}`)
console.log(`D 2: ${vehiculo2.localidad}`)
