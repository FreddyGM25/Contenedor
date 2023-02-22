require("dotenv").config()
const stripe = require('stripe')(process.env.KEYSTRIPE)
const transactionSchema = require('../../models/transaction')
const userSchema = require('../../models/user')

module.exports = async function (req, res) {
    try {
        const token = req.headers.authorization.split(' ').pop()
        if (token != "null") {
            const tokenver = await TokenVerify(token)
            const userp = await userSchema.findById(tokenver._id)
            const usert = await userSchema.findOne(req.params.idterapeuta)
            const transaction = new transactionSchema({
                nombre: userp.nombre,
                apellido: userp.apellido,
                email: userp.email,
                statusTransaction: "Pendiente",
                cantidadh: req.body.cantidadh,
                monto: usert.valorh * req.body.cantidadh,
                tipo: "Stripe",
                idterapeuta: req.body.idterapeuta
            })
            const result = await transaction.save()

            const session = await stripe.checkout.sessions.create({
                line_items: [{
                    name: 'Terapia',
                    description: `Terapia con ${usert.nombre} ${usert.apellido}`,
                    amount: usert.valorh,
                    currency: 'usd',
                    quantity: req.body.cantidadh,
                }],
                success_url: `${process.env.YOUR_DOMAIN}/terapia?idt=${result._id}`,
                cancel_url: `${process.env.YOUR_DOMAIN}`,
            })
            await transactionSchema.updateOne({ _id: result._id }, {
                $set: {
                    idpago: session.id
                }
            })
            res.json({ url: session.url })
        } else {
            return res.status(200).send({ response: "Error", message: "Se requiere autenticacion para esta operacion" })
        }
    } catch (e) {
        res.status(500).json({ error: e.message })
    }

}
