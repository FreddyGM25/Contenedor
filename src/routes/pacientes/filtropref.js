const userSchema = require('../../models/usuario')
const citaSchema = require('../../models/cita')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    if (token != "null") {
        const tokenver = await TokenVerify(token)
        const paciente = await userSchema.findById(tokenver._id)
        if (paciente.rol == "paciente") {
            let result = await userSchema.find({ rol: "terapeuta" })
            if (paciente.preferencia[0] != "cualquiera") {
                result = result.filter((elem) => elem.edad >= paciente.preferencia[0] && elem.edad <= paciente.preferencia[1])
            }
            if (paciente.preferencia[2] != "cualquiera") {
                result = result.filter((elem) => elem.genero == paciente.preferencia[2])
            }
            if (paciente.preferencia[3] != "cualquiera") {
                result = result.filter((elem) => elem.valorh >= paciente.preferencia[3] && elem.valorh <= paciente.preferencia[4])
            }
            if (paciente.preferencia[5] != "cualquiera") {
                result = result.filter((elem) => elem.especialidad.includes(paciente.preferencia[5]))
            }
            const datam = result
            return res.status(200).send({ response: "Success", datam: datam })
        } else {
            return res.status(200).send({ response: "Error", message: "Este es un usuario normal" })
        }
    } else {
        return res.status(200).send({ response: "Error", message: "Esta operacion requiere autenticacion" })
    }
}