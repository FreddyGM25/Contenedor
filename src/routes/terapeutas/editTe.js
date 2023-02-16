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
            const terapia = await terapiaSchema.findById(req.params.id)
            const price = await stripe.prices.retrieve(
                terapia.idprecio
            );
            const product = await stripe.products.update(
                price.product,
                {
                    name: req.body.nombre,
                    description: req.body.descripcion,
                }
            );
            await stripe.prices.update(
                terapia.idprecio,
                { active: false }
            );
            const precio = await stripe.prices.create({
                product: product.id,
                unit_amount: `${req.body.precio}00`,
                currency: 'usd',
            });
            const infote = await terapiaSchema.findById(req.params.id)
            const user = await userSchema.findById(infote.idterapeuta)
            await terapiaSchema.updateOne({ _id: req.params.id }, {
                $set: {
                    nombre: user.nombre + " " + user.apellido,
                    tipo: req.body.tipo,
                    cantidad: req.body.cantidad,
                    precio: req.body.precio,
                    idprecio: precio.id
                }
            })
            return res.status(200).send({ response: "Success", message: "Se actualizo la terapia correctamente" })
        } else {
            return res.status(200).send({ response: "Error", message: "Este no es un usuario terapeuta" })
        }
    } else {
        return res.status(200).send({ response: "Error", message: "Esta operacion requiere autenticacion" })
    }
}