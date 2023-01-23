const express = require("express")
const router = express.Router()
const { uploadFile } = require('../middleware/upload')
const multer = require("multer");
const upload = multer()

router.post('/paciente/register', upload.none(), require('./paciente/register'))
router.post('/paciente/login', upload.none(), require('./paciente/login'))

router.post('/terapeuta/register', upload.none(), require('./terapeutas/register'))
router.post('/terapeuta/login', upload.none(), require('./terapeutas/login'))

module.exports = router