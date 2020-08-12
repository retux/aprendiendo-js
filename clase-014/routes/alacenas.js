const express = require('express')
const router = express.Router()

const respuestaExitosa = (res, obj) => {
  res.status(200).send(Object.assign({ ok: true }, obj))
}

const todasLasAlacenas = (req, res) => {
  respuestaExitosa(res, { ruta: 'alacenas', querystring: req.query })
}

const crearAlacena = (req, res) => {
  respuestaExitosa(res, { ruta: 'alacenas', body: req.body })
}

const traerUnaAlacena = (req, res) => {
  respuestaExitosa(res, { ruta: 'alacenas id', querystring: req.query, params: req.params })
}

const traerDetalleAlacena = (req, res) => {
  respuestaExitosa(res, { ruta: 'alacenas id detalle', querystring: req.query, params: req.params })
}

const traerDetalleEspecificoAlacena = (req, res) => {
  respuestaExitosa(res, { ruta: 'alacenas id detalle especifico', querystring: req.query, params: req.params })
}

const rutas = [
  { ruta: '/', metodo: 'get', function: todasLasAlacenas },
  { ruta: '/', metodo: 'post', function: crearAlacena },
  { ruta: '/:id', metodo: 'get', function: traerUnaAlacena },
  { ruta: '/:id/detalle', metodo: 'get', function: traerDetalleAlacena },
  { ruta: '/:id/detalle/:detalle', metodo: 'get', function: traerDetalleEspecificoAlacena }
]

rutas.forEach(ruta => {
  if (ruta.metodo === 'get') {
    router.get(ruta.ruta, ruta.function)
  } else if (ruta.metodo === 'post') {
    router.post(ruta.ruta, ruta.function)
  } else {
    console('Este tipo de rutas no lo entiendo')
  }
})

module.exports = router
