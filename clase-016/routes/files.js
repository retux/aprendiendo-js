const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer')
const uploadsDestination = path.join(process.cwd(), 'uploads')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDestination)
  },
  filename: function (req, file, cb) {
    const filename = file.originalname.split('.')
    cb(null, `${file.originalname.replace(`.${filename[filename.length - 1]}`, '')}-${Date.now()}.${filename[filename.length - 1]}`)
  }
})
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2
  }
})

router.post('/upload', upload.array('archivo', 2), async (req, res) => {
  console.log(req.file)
  console.log(req.files)
  console.log(req.body)
  res.status(200).send({ ok: true })
})

module.exports = router
