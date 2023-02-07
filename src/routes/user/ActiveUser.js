const userSchema = require('../../models/usuario')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function Authuser(req, res) {
    const token = req.query.token.split(' ').pop()
    const tokenver = await TokenVerify(token)
    if (tokenver) {
        const user = await userSchema.findById(tokenver._id)
        if (user.isActive == false) {
            await userSchema.updateOne({ _id:  user._id}, {
                $set: {
                  isActive: true
                }
              })
            return res.status(200).send({ response: "Success", message: "Cuenta activada correctamente"})
        } else {
            return res.status(200).send({response: "Error", message: "Esta cuenta esta activada" })
        }

    } else {
        return { message: "Esta operacion requiere autenticacion" }
    }
}