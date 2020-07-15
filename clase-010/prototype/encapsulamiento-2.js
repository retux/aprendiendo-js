function Informe () {
  const secreto = 'Sshhhh esto es un SECRETO!'
  const dameElSecreto = _ => {
    return secreto
  }
  return {
    dameElSecreto
  }
}

const informe = Informe()
console.log(informe.dameElSecreto())
console.log(informe.secreto)
