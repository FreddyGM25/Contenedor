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

router.post('/admin/createp', upload.none(), require('./admin/paciente/createP'))
router.post('/admin/createt', upload.none(), require('./admin/terapeuta/createT'))

router.put('/admin/editp', upload.none(), require('./admin/paciente/editP'))
router.put('/admin/editt',  uploadFile('video').single('video'), require('./admin/terapeuta/editT'))

router.delete('/admin/remove/:id', upload.none(), require('./admin/remove'))

module.exports = router