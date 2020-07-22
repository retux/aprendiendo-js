// const fs = require('fs').promises
// const path = require('path')

// ;(async _ => {
//   try {
//     const filePath = path.join(__dirname, 'str.json')

//     // const objeto = 2
//     const objeto = {
//       hola: 'mundo',
//       arr: [
//         'seba',
//         'retux'
//       ],
//       features: {
//         curso: 'Aprendiendo.js',
//         clase: 11,
//         fecha: new Date()
//       }
//     }
//     console.log(objeto, typeof objeto)

//     const str = JSON.stringify(objeto, null, 2)
//     await fs.writeFile(filePath, str)
//     const objStr = await fs.readFile(filePath)
//     const obj = JSON.parse(objStr)
//     console.log(obj, typeof obj)
//   } catch (error) {
//     console.log(`ESTE ERROR LO SALVE: ${error.message}`)
//   }
// })()

const bebidas = [
  'cerveza',
  'vino',
  'vodka'
]

for (let i = 0; i < bebidas.length; i++) {
  const bebida = bebidas[i]
  console.log(bebida)
}
