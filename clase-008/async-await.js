console.log('Empieza')

const dameLaTemperaturaSync = _ => {
  return 'Hace 18 grados (sincronico)'
}

const dameLaTemperaturaCallback = (callback) => {
  callback('Hace 18 grados (callback)')
}

const dameLaTemperaturaPromise = (tipo) => {
  return Promise.resolve(`Hace 18 grados (${tipo || 'promise'})`)
}

const dameLaTemperaturaAsync = async _ => {
  // return Promise.resolve('Hace 18 grados (async)')

  // return dameLaTemperaturaPromise('async')

  // return 'Hace 18 grados (async)'

  // return new Promise((resolve, reject) => {
  //   // resolve('Hace 18 grados (async)')
  //   setTimeout(_ => {
  //     resolve('Hace 18 grados (async)')
  //   }, 2000)
  // })

  // throw new Error('EPA')
}

(async _ => {
  const temperaturaSync = dameLaTemperaturaSync()
  console.log(temperaturaSync)

  dameLaTemperaturaCallback(temperatura => {
    console.log(temperatura)
  })

  dameLaTemperaturaPromise().then(temperatura => {
    console.log(temperatura)
  })

  // dameLaTemperaturaAsync().then(temperatura => {
  //   console.log(temperatura)
  // })
  // console.log(dameLaTemperaturaAsync())

  try {
    const temperaturaAsync = await dameLaTemperaturaAsync()
    console.log(temperaturaAsync)
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }

  console.log('Termina')
})()
