const EventEmitter = require('events')

class MyEmitter extends EventEmitter {
}

const myEmitter = new MyEmitter()
myEmitter.on('evento', () => {
  console.log('ocurrio un evento')
})
myEmitter.emit('evento')
