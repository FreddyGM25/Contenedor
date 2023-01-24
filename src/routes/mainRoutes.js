const express = require("express")
const router = express.Router()
const { uploadFile } = require('../middleware/upload')
const multer = require("multer");
const upload = multer()

router.post('/paciente/login', upload.none(), require('./paciente/loginPaciente'))
router.post('/terapeuta/login', upload.none(), require('./terapeutas/loginTerapeuta'))
router.post('/register', upload.none(), require('./user/register'))

module.exports = router