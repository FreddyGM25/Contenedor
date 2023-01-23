const multer = require('multer')
const path = require('path')
require("dotenv").config()

function uploadFile(ruta) {
    var storage = multer.diskStorage({
        destination: `src/images/${ruta}`,
        filename: function (req, file, cb) {
            const extension = path.extname(file.originalname)
            cb(null, Date.now() + extension)
        },
        limits: {
            fieldSize: 10000000,
        },
    })
    const upload = multer({ storage: storage })
    return upload

}

function imgUrl (filename){
    this.imgUrl = `${process.env.URLB}/public/${filename}`
}

module.exports = {uploadFile, imgUrl}