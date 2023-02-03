const bcrypt = require('bcryptjs')
const userSchema = require("../../models/usuario")
const { TokenAssign } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const password = req.body.password
    const user = await userSchema.findOne({ email: req.body.email })
    if (user == null) return res.status(200).send({ response: "Error", message: "Esta cuenta no existe" })
    const isPasswordMatched = await bcrypt.compare(password, user.password)
    if (isPasswordMatched) {
        if (user.isActive == true) {
            if (user.rol == "terapeuta" || user.rol == "paciente") {
                const token = await TokenAssign(user)
                res.cookie('token', token, { httpOnly: true })
                if (user.isFirst == true) {
                    await userSchema.updateOne({ _id: user._id }, {
                        $set: {
                            isFirst: false
                        }
                    })
                    return res.status(200).send({ response: "Success", message: 'Inicio sesion', rol: user.rol, token: token, isFirst: true })
                }
                return res.status(200).send({ response: "Success", message: 'Inicio sesion', rol: user.rol, token: token, isFirst: false })
            }
            if (user.rol == "admin") {
                const token = await TokenAssign(user)
                res.cookie('token', token, { httpOnly: true });
                return res.status(200).send({ response: "Success", message: 'Inicio sesion', rol: user.rol, token: token })
            }
        } else {
            return res.status(200).send({ response: "Error", message: 'Active su cuenta primero, revise su correo electronico' })
        }
    } return res.status(200).send({ response: "Error", message: "Contraseña incorrecta" })
}
