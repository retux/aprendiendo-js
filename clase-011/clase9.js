let variable = 0

const logger = (text) => {
  console.log(text)
}

const suma = (a, b) => {
  logger(`estoy sumando ${a}, ${b}`)
  return a + b
}

const incrementador = _ => {
  variable++
}

const getComun = function () {
  console.log(this)
}

const objeto = {
  empanada: 'carne',
  getComun,
  get: _ => {
    this.name = 'hola'
    console.log(this)
  }
}

const objetoHumita = {
  empanada: 'humita',
  getComun,
  getComun2: function () {
    console.log(this)
  }
}

objeto.getComun()
objeto.get()
getComun()

module.exports = {
  suma,
  get: objeto.get,
  getComun: objeto.getComun,
  getComunHumita: objetoHumita.getComun,
  getComunHumita2: objetoHumita.getComun2,
  incrementador
}
