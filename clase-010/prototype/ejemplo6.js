const vehiculo = {
  ruedas: true,
  volante: 1,
  motor: '8v'
}

const instancia = Object.create(vehiculo)
console.log(instancia.ruedas, instancia.volante, instancia.motor, JSON.stringify(instancia))
