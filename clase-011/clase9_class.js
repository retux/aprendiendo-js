class Seba {
  constructor () {
    this.name = 'Seba'
    const proto = Object.getPrototypeOf(this)
    if (!proto.counter) {
      proto.counter = 1
    } else {
      proto.counter++
    }
  }

  get () {
    const self = this
    const arr = [
      'carne',
      'pollo'
    ]
    arr.forEach(function (empanada) {
      console.log('Empanada: ', empanada, this, self)
    })
    const imprimirArrow = _ => {
      this.name = 'sebastian'
      console.log('Arrow: ', this)
    }
    // imprimirComun()
    // imprimirArrow()
  }
}

const obj = new Seba()
// new Seba()
// new Seba()
// new Seba()
// new Seba()
// console.log(obj.counter)
obj.get()
