const userSchema = require('../../models/usuario')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    if (token != "null") {
        const tokenver = await TokenVerify(token)
        const terapeuta = await userSchema.findById(tokenver._id)
        if (terapeuta.rol == "terapeuta") {
            const result = await userSchema.find({rol: "terapeuta"})
            return res.status(200).send({ response: "Success", numt: result.length, nump: result1.length })
        }
    } else {
        return res.status(200).send({ response: "Error", message: "Este es un usuario normal" })
    }
}