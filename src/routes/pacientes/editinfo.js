const userSchema = require('../../models/usuario')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    if (token != "null") {
        const tokenver = await TokenVerify(token)
        const user = await userSchema.findById(tokenver._id)
        if (user.rol == "paciente") {
            if (user.email != req.body.email) {
                const ver = await userSchema.findOne({ email: req.body.email })
                if (ver != null) return res.status(200).send({ response: "Error", message: "Este email ya existe" })
            }
            await userSchema.updateOne({ _id: user._id }, {
                $set: {
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.email,
                    telefono: req.body.telefono
                }
            })
            return res.status(200).send({ response: "Success", message: "Cambios guardados correctamente" })
        } else {
            return res.status(200).send({ response: "Error", message: "Este no es un usuario paciente" })
        }

    } else {
        return res.status(200).send({ response: "Error", message: "Esta operacion requiere autenticacion" })
    }
}
