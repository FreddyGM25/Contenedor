const express = require("express")
const router = express.Router()
const { uploadFile } = require('../middleware/upload')
const multer = require("multer");
const upload = multer()

router.get('/admin/seep', require('./admin/paciente/seeP'))
router.get('/admin/seet', require('./admin/terapeuta/seeT'))
router.get('/admin/seete', require('./admin/terapias/seeTe'))
router.get('/user/see', require('./user/datauser'))

router.post('/login', upload.none(), require('./user/login'))
router.post('/register', upload.none(), require('./user/register'))

router.post('/admin/createp', upload.none(), require('./admin/paciente/createP'))
router.post('/admin/createt', uploadFile('video').single('video'), require('./admin/terapeuta/createT'))

router.put('/admin/editp/:id', upload.none(), require('./admin/paciente/editP'))
router.put('/admin/editt/:id',  uploadFile('video').single('video'), require('./admin/terapeuta/editT'))
router.put('/admin/status/:id', upload.none(), require('./admin/terapeuta/changeStatus'))

router.post('/admin/createte', upload.none(), require('./admin/terapias/createTe'))

router.delete('/admin/remove/:id', upload.none(), require('./admin/remove'))
router.delete('/admin/removete/:id', upload.none(), require('./admin/terapias/removeTe'))

module.exports = router