const { eventos, server } = require('./server')
const ids = [
  '1',
  '2'
]
const createListener = (id) => {
  server.on(eventos.cobrar, (arg1, arg2, arg3) => {
    console.log(`#${id}: logre cobrar (${arg1})`)
  })
  console.log(`Listener #${id} esta levantado`)
}

ids.forEach(createListener)

setInterval(_ => {
  server.emit(eventos.cobrar, '1', 2, 3, false)
}, 1000)

setTimeout(_ => {
  createListener('3')
}, 3000)

setTimeout(_ => {
  server.removeAllListeners()
}, 4000)
