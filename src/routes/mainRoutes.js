const express = require("express")
const router = express.Router()
const { uploadFile } = require('../middleware/upload')
const multer = require("multer");
const upload = multer()

router.get('/admin/seep', require('./admin/paciente/seeP'))
router.get('/admin/seet', require('./admin/terapeuta/seeT'))
router.get('/admin/seete', require('./admin/terapia/seeTe'))
router.get('/admin/seep/:id', require('./admin/paciente/seeOne'))
router.get('/admin/seet/:id', require('./admin/terapeuta/seeOne'))
router.get('/admin/seete/:id', require('./admin/terapia/seeOne'))
router.get('/admin/seepub', require('./admin/blog/seeblog'))
router.get('/admin/seepub/:id', require('./admin/blog/seeblogone'))
router.get('/user/see', require('./user/datauser'))
router.get('/user/datanum', require('./terapeutas/numD'))
router.get('/user/valid', require('./user/ActiveUser'))
router.get('/user/seec', require('./pacientes/datacita'))
router.get('/terapeuta/citas', require('./terapeutas/citas'))
router.get('/terapeuta/seete', require('./terapeutas/seeTe'))
router.get('/terapeuta/seete/:id', require('./terapeutas/seeOne'))

router.post('/login', upload.none(), require('./user/login'))
router.post('/registerp', upload.none(), require('./user/registerP'))
router.post('/registert', upload.none(), require('./user/registerT'))
router.post('/user/create', upload.none(), require('./pacientes/Crearc'))

router.post('/admin/createp', upload.none(), require('./admin/paciente/createP'))
router.post('/admin/createt', uploadFile('video').single('video'), require('./admin/terapeuta/createT'))

router.post('/admin/createte', upload.none(), require('./admin/terapia/createTe'))

router.post('/admin/createblog', uploadFile('post').single('img'), require('./admin/blog/createB'))

router.post('/terapeuta/createte', upload.none(), require('./terapeutas/createTe'))

router.post('/filtro/preferencia', upload.none(), require('./pacientes/filtropref'))
router.post('/filtro/hora', upload.none(), require('./pacientes/filtrohora'))
router.post('/preferencias', upload.none(), require('./pacientes/preferencia'))

router.put('/admin/editpi/:id', upload.none(), require('./admin/paciente/editifnoP'))
router.put('/admin/editp/:id', upload.none(), require('./admin/editpass'))
router.put('/admin/editti/:id', upload.none(), require('./admin/terapeuta/editinfoT'))
router.put('/admin/edittv/:id', uploadFile('video').single('video'), require('./admin/terapeuta/editvideoT'))

router.put('/admin/edittei/:id', upload.none(), require('./admin/terapia/editTe'))

router.put('/admin/status/:id', upload.none(), require('./admin/changeStatus'))

router.put('/admin/editpub/:id', upload.none(), require('./admin/blog/updateP'))
router.put('/admin/editpubi/:id', uploadFile('post').single('img'), require('./admin/blog/updatePI'))

router.put('/terapeuta/editi', upload.none(), require('./terapeutas/editinfo'))
router.put('/terapeuta/editpass', upload.none(), require('./terapeutas/editpass'))
router.put('/terapeuta/editimg', uploadFile('profile').single('imgpro'), require('./terapeutas/editimg'))
router.put('/terapeuta/editv', uploadFile('video').single('video'), require('./terapeutas/editvideo'))
router.put('/terapeuta/editte/:id', upload.none(), require('./terapeutas/editTe'))

router.put('/paciente/editi', upload.none(), require('./pacientes/editinfo'))
router.put('/paciente/editpass', upload.none(), require('./pacientes/editpass'))
router.put('/paciente/editimg', uploadFile('profile').single('imgpro'), require('./pacientes/editimg'))


router.delete('/admin/remove/:id', upload.none(), require('./admin/remove'))
router.delete('/admin/removete/:id', upload.none(), require('./admin/terapia/removeTe'))
router.delete('/admin/removepub/:id', upload.none(), require('./admin/blog/deleteblog'))

router.delete('/terapeuta/removete/:id', upload.none(), require('./terapeutas/removeTe'))

module.exports = router