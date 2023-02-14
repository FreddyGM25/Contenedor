const userSchema = require('../../../models/usuario')
const blogSchema = require('../../../models/blog')
const { TokenVerify } = require('../../../middleware/autentication')
const fs = require('fs').promises

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    if (token != "null") {
        const tokenver = await TokenVerify(token)
        const admin = await userSchema.findById(tokenver._id)
        if (admin.rol == "admin") {
            if(!req.file) return res.status(200).send({ response: "Error", message: "Se requiere subir una imagen" })
            const post = await blogSchema.findById(req.params.id)
            fs.unlink('./src/images/post/' + post.img.fileName)
            await blogSchema.updateOne({ _id: req.params.id }, {
                $set: {
                    img: {
                        fileName: req.file.filename,
                        filePath: `${process.env.URLB}/post/${req.file.filename}`,
                        fileType: req.file.mimetype,
                        fileSize: req.file.size
                    }
                }
            })
            return res.status(200).send({ response: "Success", message: `Imagen actualizada correctamente` })
        } else {
            return res.status(200).send({ response: "Error", message: "Este es un usuario normal" })
        }
    } else {
        return res.status(200).send({ response: "Error", message: "Esta operacion requiere autenticacion" })
    }
}