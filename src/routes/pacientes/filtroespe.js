const userSchema = require('../../models/usuario')
const citaSchema = require('../../models/cita')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    if (token != "null") {
        const tokenver = await TokenVerify(token)
        const paciente = await userSchema.findById(tokenver._id)
        if (paciente.rol == "paciente") {
            const especialidad = req.body.especialidad.split(", " || ",")
            const disponible = await userSchema.find({ especialidad: { $in: especialidad }, rol: "terapeuta" })
            return res.status(200).send({ response: "Success", data: disponible })
        } else {
            return res.status(200).send({ response: "Error", message: "Este no es un usuario paciente" })
        }
    } else {
        return res.status(200).send({ response: "Error", message: "Esta operacion requiere autenticacion" })
    }
}