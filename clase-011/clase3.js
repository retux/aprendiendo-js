function imprimir () {
  console.log('hola mundo')
}

const imprimirVariable = function () {
  console.log('hola mundo (variable)')
}

const imprimirVariable2 = function () {
  console.log('hola mundo (variable 2)')
}

let imprimirVariable3 = imprimirVariable2

const imprimirArrow = () => {
  console.log('hola mundo (arrow)')
}

imprimir()
imprimirVariable3()
imprimirArrow()
