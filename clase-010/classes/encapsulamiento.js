class Informe {
  constructor () {
    const secreto = 'Sshhhh esto es un SECRETO!'
    this.dameElSecreto = _ => {
      return secreto
    }
  }
}

const informe = new Informe()
console.log(informe.dameElSecreto())
console.log(informe.secreto)
