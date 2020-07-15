function Forma () {
}
Forma.prototype.area = function () {
  return 0
}
Forma.prototype.toString = function () {
  return Object.getPrototypeOf(this).constructor.name
}

function Circulo (r) {
  this.radio = r
}
Circulo.prototype = new Forma()
Circulo.prototype.constructor = Circulo
Circulo.prototype.area = function () {
  return Math.PI * (this.radio ** 2)
}

function Rectangulo (w, h) {
  this.ancho = w
  this.alto = h
}
Rectangulo.prototype = new Forma()
Rectangulo.prototype.constructor = Rectangulo
Rectangulo.prototype.area = function () {
  return this.ancho * this.alto
}

function Triangulo (b, h) {
  this.base = b
  this.alto = h
}
Triangulo.prototype = new Forma()
Triangulo.prototype.constructor = Triangulo
Triangulo.prototype.area = function () {
  return this.base * this.alto / 2
}

const formas = [
  new Circulo(3),
  new Rectangulo(5, 5),
  new Triangulo(3, 4)
]

formas.forEach(forma => {
  if (forma instanceof Forma) {
    console.log(`${forma.toString()} - Area: ${forma.area().toFixed(2)}`)
  }
})
