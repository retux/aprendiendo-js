class Forma {
  area () {
    return 0
  }

  toString () {
    return Object.getPrototypeOf(this).constructor.name
  }
}

class Circulo extends Forma {
  constructor (r) {
    super()
    this.radio = r
  }

  area () {
    return Math.PI * (this.radio ** 2)
  }
}

class Rectangulo extends Forma {
  constructor (w, h) {
    super()
    this.ancho = w
    this.alto = h
  }

  area () {
    return this.ancho * this.alto
  }
}

class Triangulo extends Forma {
  constructor (b, h) {
    super()
    this.base = b
    this.alto = h
  }

  area () {
    return this.base * this.alto / 2
  }
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
