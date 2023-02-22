const userSchema = require('../../models/usuario')
const citaSchema = require('../../models/cita')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    if (token != "null") {
        const tokenver = await TokenVerify(token)
        const user = await userSchema.findById(tokenver._id)
        const preferencia = req.body.preferencia.split(", "||",")
        await userSchema.updateOne({ _id: user._id }, {
            $set: {
                isFirst: false,
                preferencia: preferencia
            }
        })
        return res.status(200).send({ response: "Success", message: "Su preferencia se ha guardado correctamente" })
    } else {
        return res.status(200).send({ response: "Error", message: "Esta operacion requiere autenticacion" })
    }
}