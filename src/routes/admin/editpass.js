const bcrypt = require('bcryptjs')
const userSchema = require('../../models/usuario')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    if (token != "null") {
        const tokenver = await TokenVerify(token)
        const admin = await userSchema.findById(tokenver._id)
        if (admin.rol == "admin") {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashPassword;
            await userSchema.updateOne({ _id: req.params.id }, {
                $set: {
                    password: req.body.password
                }
            })
            return res.status(200).send({ response: "Success", message: "Contraseña cambiada correctamente" })
        } else {
            return res.status(200).send({ response: "Error", message: "Este es un usuario normal" })
        }
    } else {
        res.status(200).send({ response: "Error", message: "Esta operacion necesita autenticacion" })
    }
}