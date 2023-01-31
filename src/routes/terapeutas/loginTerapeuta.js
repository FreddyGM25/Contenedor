const bcrypt = require('bcryptjs')
const terapeutaSchema = require("../../models/usuario")
const { TokenAssign } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const password = req.body.password
    const terapeuta = await terapeutaSchema.findOne({ email: req.body.email })
    if (terapeuta == null) return res.status(200).send({ response: "Error", message: "Esta cuenta no existe" })
    const isPasswordMatched = await bcrypt.compare(password, terapeuta.password)
    if (isPasswordMatched) {
        if (terapeuta.isActive == true) {
            if (terapeuta.rol == "terapeuta") {
                const token = await TokenAssign(terapeuta)
                res.cookie('token', token, { httpOnly: true });
                return res.status(200).send({ response: "Success", message: 'Inicio sesion', rol: terapeuta.rol, token: token })
            }
            if(terapeuta.rol == "admin"){
                const token = await TokenAssign(terapeuta)
                res.cookie('token', token, { httpOnly: true });
                return res.status(200).send({ response: "Success", message: 'Inicio sesion', rol: terapeuta.rol, token: token })
            }
            return res.status(200).send({ response: "Error", message: 'Esta cuenta no pertenece a terapeuta' })
        } else {
            return res.status(200).send({ response: "Error", message: 'Active su cuenta primero, revise su correo electronico' })
        }
    } return res.status(200).send({ response: "Error", message: "Contraseña incorrecta" })
}
