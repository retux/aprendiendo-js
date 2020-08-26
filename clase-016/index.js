const express = require('express')

const port = 8080
const app = express()

// Middlewares
// JSON
app.use(express.json())
// x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// App
const telegram = require('./routes/telegram')
const files = require('./routes/files')
app.use('/telegram', telegram)
app.use('/files', files)

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
