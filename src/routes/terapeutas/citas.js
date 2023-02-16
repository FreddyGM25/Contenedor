const userSchema = require('../../models/usuario')
const citaSchema = require('../../models/cita')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    if (token != "null") {
        const tokenver = await TokenVerify(token)
        const terapeuta = await userSchema.findById(tokenver._id)
        if (terapeuta.rol == "terapeuta") {
            const result = await citaSchema.find({ terapeuta: terapeuta._id})
            return res.status(200).send({ response: "Success", data: result })
        }
    } else {
        return res.status(200).send({ response: "Error", message: "Este no es un usuario terapeuta" })
    }
}