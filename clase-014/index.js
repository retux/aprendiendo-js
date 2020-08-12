const express = require('express')
const app = express()
const port = 8080

const productos = require('./routes/productos')
const alacenas = require('./routes/alacenas')
const telegram = require('./routes/telegram')

// Middlewares
app.use(express.json())

// App
app.use('/productos', productos)
app.use('/alacenas', alacenas)
app.use('/telegram', telegram)

// Manejo de errores
app.use((error, req, res, next) => {
  const response = { ok: false, error: (error && error.message) || 'Unknown error' }
  if (process.env.NODE_ENV === 'development') {
    response.stack = (error && error.stack) || null
  }
  res.status(500).send(response)
})

// Manejo de 404
app.use((req, res, next) => {
  res.status(404).send({ ok: false })
})

// Comienzo de server
app.listen(port, () => {
  console.log(`Bunkero esta corriendo en http://localhost:${port}`)
})
