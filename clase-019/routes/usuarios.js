const express = require('express')
const router = express.Router()
const Usuario = require('../db/mongo/usuario')

router.post('/', async (req, res) => {
  try {
    if (!req.body || !req.body.username) {
      throw new Error('El username es requerido')
    }
    const newUser = new Usuario({ username: req.body.username })
    // TODO: Validar que el username sea un email
    // TODO: Validar que el username no exista en la DB (con y sin indices)
    // TODO: Agregar nombre y apellido
    // TODO: Agregar intereses en un array
    // TODO: Generar una password random
    // TODO: Encriptar esa password
    // TODO: Poder armar un login con JWT con este user/password
    // TODO: Armar el createdAt, updatedAt, deletedAt
    await newUser.save()
    res.status(200).send({ ok: true, user: newUser })
  } catch (error) {
    res.status(400).send({ ok: false, error: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const query = req.query || {}
    const usuarios = await Usuario.find(query)
    // TODO: Ver indices y re-habilitar el notablescan
    // TODO: Ver queries mas complejas
    res.status(200).send({ ok: true, usuarios })
  } catch (error) {
    res.status(400).send({ ok: false, error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const usuario = await Usuario.findById(id)
    // const usuario = await Usuario.findOne({ _id: id })
    if (usuario) {
      res.status(200).send({ ok: true, usuario })
    } else {
      res.status(404).send({ ok: false })
    }
  } catch (error) {
    res.status(400).send({ ok: false, error: error.message })
  }
})

router.put('/:id', async (req, res) => {
  // TODO
  res.status(200).send({ ok: true })
})

router.patch('/:id', async (req, res) => {
  // TODO
  res.status(200).send({ ok: true })
})

router.delete('/:id', async (req, res) => {
  // TODO: Borrado fisico vs logico
  res.status(200).send({ ok: true })
})

module.exports = router
