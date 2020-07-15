function Informe () {
  const secreto = 'Sshhhh esto es un SECRETO!'
  this.dameElSecreto = function () {
    return secreto
  }
}

const informe = new Informe()
console.log(informe.dameElSecreto())
console.log(informe.secreto)
