const userSchema = require('../../../models/usuario')
const terapiaSchema = require('../../../models/terapia')
const { TokenVerify } = require('../../../middleware/autentication')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    if (token != "null") {
        const tokenver = await TokenVerify(token)
        const admin = await userSchema.findById(tokenver._id)
        if (admin.rol == "admin") {
            const terapia = new terapiaSchema({
                nombre: req.body.nombre,
                tipo: req.body.tipo,
                cantidad: req.body.cantidad,
                precio: req.body.precio
            })
            await terapia.save()
            return res.status(200).send({ response: "Success", message: "Se creo la terapia correctamente" })
        } else {
            return res.status(200).send({ response: "Error", message: "Este es un usuario normal" })
        }
    } else {
        return res.status(200).send({ response: "Error", message: "Esta operacion requiere autenticacion" })
    }
}