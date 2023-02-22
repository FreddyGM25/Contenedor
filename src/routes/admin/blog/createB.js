const userSchema = require('../../../models/usuario')
const blogSchema = require('../../../models/blog')
const { TokenVerify } = require('../../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    if (token != "null") {
        const tokenver = await TokenVerify(token)
        const admin = await userSchema.findById(tokenver._id)
        if (admin.rol == "admin") {
            const blog = new blogSchema({
                titulo: req.body.titulo,
                cuerpo: req.body.cuerpo,
                autor: req.body.autor,
                descripcion: req.body.descripcion,
                img: {
                    fileName: req.file.filename,
                    filePath: `${process.env.URLB}/post/${req.file.filename}`,
                    fileType: req.file.mimetype,
                    fileSize: req.file.size
                }
            });
            await blog.save()
            return res.status(200).send({ response: "Success", message: `Publicacion creada correctamente` })
        } else {
            return res.status(200).send({ response: "Error", message: "Este es un usuario normal" })
        }
    } else {
        return res.status(200).send({ response: "Error", message: "Esta operacion requiere autenticacion" })
    }
}