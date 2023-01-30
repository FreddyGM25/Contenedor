const express = require("express")
const router = express.Router()
const { uploadFile } = require('../middleware/upload')
const multer = require("multer");
const upload = multer()

router.get('/admin/seep', require('./admin/seeP'))
router.get('/admin/seet', require('./admin/seeT'))

router.post('/paciente/login', upload.none(), require('./paciente/loginPaciente'))
router.post('/terapeuta/login', upload.none(), require('./terapeutas/loginTerapeuta'))
router.post('/register', upload.none(), require('./user/register'))

router.put('/admin/editp', require('./admin/editP'))

router.delete('/admin/remove', require('./admin/remove'))

module.exports = router