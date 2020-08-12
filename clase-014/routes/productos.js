const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).send({ ok: true, ruta: 'productos', querystring: req.query })
})

router.post('/', (req, res) => {
  res.status(200).send({ ok: true, ruta: 'productos', body: req.body })
})

module.exports = router
