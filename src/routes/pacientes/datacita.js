const citaSchema = require('../../models/cita')
const { TokenVerify } = require('../../middleware/autentication')

module.exports = async function (req, res) {
    const token = await req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    if (tokenver) {
        const cita = await citaSchema.find({paciente: tokenver._id})
        if(cita == null) return res.status(501).send({response: "Error", message: "Este nombre de usuario no existe"})
        return res.status(200).send({response: "Success", data: cita })
    }else{
        return res.status(200).send({response: "Error", error: "Se requiere autenticacion"})
    }

}