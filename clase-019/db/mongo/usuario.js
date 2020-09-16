const mongoose = require('mongoose')

const usuariosSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String }
}, {
  // _id: false,
  versionKey: false
})

const Usuario = mongoose.model('Usuarios', usuariosSchema)

module.exports = Usuario
