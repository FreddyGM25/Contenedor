const userSchema = require('../../models/usuario')
const { TokenVerify } = require('../../middleware/autentication')
const fs = require('fs').promises

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    if (token != "null") {
        const tokenver = await TokenVerify(token)
        const user = await userSchema.findById(tokenver._id)
        if (user.rol == "terapeuta") {
            if (req.file) {
                fs.unlink('./src/images/video/' + user.video.fileName)
                await userSchema.updateOne({ _id: user._id }, {
                    $set: {
                        video: {
                            fileName: req.file.filename,
                            filePath: `${process.env.URLB}/video/${req.file.filename}`,
                            fileType: req.file.mimetype
                        }
                    }
                })
                return res.status(200).send({ response: "Success", message: "Cambios guardados correctamente" })
            } else {
                return res.status(200).send({ response: "Error", message: "Por favor seleccione algun archivo de video" })
            }
        } else {
            return res.status(200).send({ response: "Error", message: "Este no es un usuario terapeuta" })
        }

    } else {
        return res.status(200).send({ response: "Error", message: "Esta operacion requiere autenticacion" })
    }
}
