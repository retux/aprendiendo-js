const suma = (a, b) => {
  return a + b
}

// const resta = require('../utilidades').resta
const { resta, resta2, loaded } = require('../utilidades')
const { divide } = require('./divide')

console.log(loaded)

module.exports = {
  suma,
  resta,
  resta2,
  divide
}
