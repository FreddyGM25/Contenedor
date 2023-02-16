const userSchema = require('../../models/usuario')
const terapiaSchema = require('../../models/terapia')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    if (token != "null") {
        const tokenver = await TokenVerify(token)
        const user = await userSchema.findById(tokenver._id)
        if (user.rol == "terapeuta") {
            return terapiaSchema.findById(req.params.id)
                .then((data) => res.status(200).send({ response: "Success", datainfo: data }))
                .catch((error) => res.status(200).send({ response: "Error", message: error }));
        }else{
            return res.status(200).send({ response: "Error", message: "Este es un usuario normal" })
        }
    }
}