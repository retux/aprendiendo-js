// const readline = require('readline')

const fs = require('fs')
const readline = require('readline')

async function procesaArchivo () {
  const fileStream = fs.createReadStream('./persona.json')

  const rl1 = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let objetoString = ''
  for await (const line of rl1) {
    objetoString += line
  }

  let objetoJSON

  if (objetoString !== '') {
    try {
      objetoJSON = JSON.parse(objetoString)
      rl1.close()
      return objetoJSON
    } catch (error) {
      console.log(`No es un json: ${error.message}`)
    }
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const Pregunta1 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Ingrese su nombre: ', (answer) => {
      return resolve(answer)
    })
  })
}

const Pregunta2 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Ingrese su edad: ', (answer) => {
      return resolve(answer)
    })
  })
}

async function escribeArchivo (objeto) {
  const fileStream = fs.createWriteStream('./persona.json')
  fileStream.write(JSON.stringify(objeto))
}

const main = async () => {

  const persona = {
    nombre: '',
    edad: ''
  }

  const objeto = await procesaArchivo()

  for (var [key, value] of Object.entries(objeto)) {
    if (value) {
      console.log(`Valor grabado anteriormente: ${key}  ${value}`)
    }
  }
  let p1 = ''
  let p2 = ''
  while (p1 === '') {
    p1 = await Pregunta1()
  }
  persona.nombre = p1
  while (p2 === '') {
    p2 = await Pregunta2()
  }
  persona.edad = p2

  await escribeArchivo(persona)

  rl.close()
}

main()
