const userSchema = require('../../../models/usuario')
const { TokenVerify } = require('../../../middleware/autentication')
const fs = require('fs').promises

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    if (token != "null") {
        const tokenver = await TokenVerify(token)
        const admin = await userSchema.findById(tokenver._id)
        if (admin.rol == "admin") {
            const user = await userSchema.findById(req.params.id)
            await userSchema.updateOne({ _id: user._id }, {
                $set: {
                    isActive: req.body.status,
                }
            })
            return res.status(200).send({ response: "Success", message: "Estado cambiado correctamente" })
        } else {
            return res.status(200).send({ response: "Error", message: "Este es un usuario normal" })
        }
    } else {
        return res.status(200).send({ response: "Error", message: "Esta operacion requiere autenticacion" })
    }
}
