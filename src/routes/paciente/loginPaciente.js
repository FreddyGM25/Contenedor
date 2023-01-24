const bcrypt = require('bcryptjs')
const pacienteSchema = require("../../models/usuario")
const { TokenAssign } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const password = req.body.password
    const paciente = await pacienteSchema.findOne({ email: req.body.email })
    if(paciente == null) return res.status(200).send({ response: "Error", message: "Esta cuenta no existe" })
    const isPasswordMatched = await bcrypt.compare(password, paciente.password)
    if (isPasswordMatched) {
        if (paciente.isActive == true) {
            if (paciente.rol == "paciente") {
                const token = await TokenAssign(paciente)
                res.cookie('token', token, { httpOnly: true });
                return res.status(200).send({ response: "Success", message: 'Inicio sesion', name: paciente.name, token: token })
            }else{
                return res.status(200).send({ response: "Error", message: 'Esta cuenta no pertenece a paciente' })
            }
        } else {
            return res.status(200).send({ response: "Error", message: 'Active su cuenta primero, revise su correo electronico' })
        }
    } return res.status(200).send({ response: "Error", message: "Contraseña incorrecta" })

}
