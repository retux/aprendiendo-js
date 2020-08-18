const express = require('express')
const router = express.Router()

const home = (req, res) => {
  res.render('index')
}

const productos = async (req, res) => {
  const productos = await new Promise((resolve, reject) => {
    setTimeout(_ => {
      resolve([
        {
          nombre: 'empanadas',
          valor: 300
        },
        {
          nombre: 'pizza',
          valor: 1300
        },
        {
          nombre: 'faina',
          valor: 5300
        }
      ])
    }, 3000)
  })
  res.render('productos', { mercadoPago: false, productos })
}

router.get('/', home)
router.get('/productos', productos)

module.exports = router
