const EventEmitter = require('events')
const eventos = {
  cobrar: 'cobrar'
}

class MyEmitter extends EventEmitter {
}

const myEmitter = new MyEmitter()

module.exports = {
  eventos,
  server: myEmitter
}
