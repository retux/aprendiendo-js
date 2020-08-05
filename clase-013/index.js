const express = require('express')
const app = express()
const port = 8080

app.use(express.json()) // for parsing application/json
// app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
  console.log('pre middleware')
  next()
})

app.get('/', (req, res) => {
  const response = {
    hello: 'world'
  }
  res.send(response)
})

app.post('/producto', (req, res) => {
  console.log('POST producto')
  console.log(req.body)
  throw new Error('EPA FALLO TODO')
  res.send({ ok: true })
})

app.use((error, req, res, next) => {
  const response = { ok: false, error: (error && error.message) || 'Unknown error' }
  if (process.env.NODE_ENV === 'development') {
    response.stack = (error && error.stack) || null
  }
  console.log(process.env)
  res.status(500).send(response)
})

app.use((req, res, next) => {
  res.status(404).send({ ok: false })
})

app.listen(port, () => {
  console.log(`Bunkero esta corriendo en http://localhost:${port}`)
})
