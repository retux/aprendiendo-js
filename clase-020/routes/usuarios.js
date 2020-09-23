const express = require('express')
const router = express.Router()
const Usuario = require('../db/mongo/usuario')

router.post('/', async (req, res) => {
  try {
    const newUser = new Usuario(req.body)
    // TODO: Generar una password random
    // TODO: Encriptar esa password
    // TODO: Poder armar un login con JWT con este user/password
    // TODO: Armar middleware de validacion de JWT
    await newUser.save()
    res.status(200).send({ ok: true, user: newUser })
  } catch (error) {
    res.status(400).send({ ok: false, error: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const query = req.query || {}
    query.deletedAt = null
    if (req.query.showDeleted) {
      query.deletedAt = { $ne: null }
      delete query.showDeleted
      delete req.query.showDeleted
    }
    const usuarios = await Usuario.find(query)
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
  // TODO put
  res.status(200).send({ ok: true })
})

router.patch('/:id', async (req, res) => {
  // TODO patch
  res.status(200).send({ ok: true })
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  // Borrado fisico
  // await Usuario.deleteOne({ _id: id })

  // Borrado logico
  const usuario = await Usuario.findById(id)
  usuario.deletedAt = new Date()
  await usuario.save()

  res.status(200).send({ ok: true })
})

module.exports = router
