const userSchema = require('../../../models/usuario')
const blogSchema = require('../../../models/blog')
const { TokenVerify } = require('../../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    if (token != "null") {
        const tokenver = await TokenVerify(token)
        const admin = await userSchema.findById(tokenver._id)
        if (admin.rol == "admin") {
            await blogSchema.updateOne({ _id: req.params.id }, {
                $set: {
                  titulo: req.body.titulo,
                  cuerpo: req.body.cuerpo,
                  descripcion: req.body.descripcion
                }
              })
            return res.status(200).send({ response: "Success", message: `Publicacion actualizada correctamente` })
        } else {
            return res.status(200).send({ response: "Error", message: "Este es un usuario normal" })
        }
    } else {
        return res.status(200).send({ response: "Error", message: "Esta operacion requiere autenticacion" })
    }
}