const express = require('express')
const got = require('got')
const app = express()
const port = 3129

// app.use(express.json()) // for parsing application/json

app.get('/', async (req, res) => {
  const url = req.query.url
  if (url.length === 0) {
    throw new Error('Need to provide and url buddy!')
  }
  let remoteResponse
  try {
    remoteResponse = await got.get(url)
  } catch (err) {
    throw new Error(`Something went wrong: ${err.message}`)
  }
  // console.log(req.headers)
  console.log(`[info] should be translated to: http://${req.headers.host}?url=${url}`)
  // console.log(req.hostname)
  // url.replace(/http[s]?:\/\/.*\//, 'http://localhost/')
  // console.log(req.headers.host)
  // const tolocalResponse = remoteResponse.body.replace(/http[s]?:\/\/.*\//g, `http://${req.headers.host}?url=${url}`)
  // console.log(tolocalResponse)
  res.send(remoteResponse.body)
})

app.use((error, req, res, next) => {
  const response = { ok: false, error: (error && error.message) || 'Unknown error' }
  if (process.env.NODE_ENV === 'development') {
    response.stack = (error && error.stack) || null
  }
  res.status(500).send(response)
})

app.use((req, res, next) => {
  res.status(404).send({ ok: false })
})

app.listen(port, () => {
  console.log(`ssl-remover running  http://localhost:${port}`)
})
