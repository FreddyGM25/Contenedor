const userSchema = require('../../models/usuario')
const terapiaSchema = require('../../models/terapia')
const { TokenVerify } = require('../../middleware/autentication')
const stripe = require('stripe')(process.env.KEY_STRIPE)

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    if (token != "null") {
        const tokenver = await TokenVerify(token)
        const user = await userSchema.findById(tokenver._id)
        if (user.rol == "terapeuta") {
            const product = await stripe.products.create({
                name: req.body.nombre,
                description: req.body.descripcion,
            })
            const price = await stripe.prices.create({
                product: product.id,
                unit_amount: `${req.body.precio}00`,
                currency: 'usd',
            });
            const user = await userSchema.findById(req.body.idterapeuta)
            const terapia = new terapiaSchema({
                nombre: user.nombre + " " + user.apellido,
                tipo: req.body.tipo,
                cantidad: req.body.cantidad,
                precio: req.body.precio,
                idterapeuta: req.body.idterapeuta,
                idprecio: price.id
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