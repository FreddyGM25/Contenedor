const userSchema = require('../../../models/usuario')
const terapiaSchema = require('../../../models/terapia')
const { TokenVerify } = require('../../../middleware/autentication')
const stripe = require('stripe')(process.env.KEY_STRIPE)

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    if (token != "null") {
        const tokenver = await TokenVerify(token)
        const admin = await userSchema.findById(tokenver._id)
        if (admin.rol == "admin") {
            const terapia = await terapiaSchema.findById(req.params.id)
            const price = await stripe.prices.retrieve(
                terapia.idprecio
            );
            await stripe.products.del(
                price.product
            );
            await stripe.prices.update(
                terapia.idprecio,
                { active: false }
            );
            const result = await terapiaSchema.remove({ _id: req.params.id })
            if (result.deletedCount == 0) return res.status(200).send({ response: "Error", message: "Esta terapia ya ha sido eliminado" })
            return res.status(200).send({ response: "Success", message: "Se elimino la terapia correctamente" })
        } else {
            return res.status(200).send({ response: "Error", message: "Este es un usuario normal" })
        }
    } else {
        return res.status(200).send({ response: "Error", message: "Esta operacion requiere autenticacion" })
    }
}