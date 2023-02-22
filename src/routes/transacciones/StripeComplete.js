
const transactionSchema = require('../../models/transaccion')
const userSchema = require('../../models/usuario')
const stripe = require('stripe')(process.env.KEYSTRIPE)

module.exports = async function (req, res) {
    const idt = req.body.idt
    const transaccionb = await transactionSchema.findOne({ _id: idt })
    if (transaccionb.statusTransaction == "Complete") return res.status(200).send({ response: "Error", message: "Donacion ya realizada" })
    const session = await stripe.checkout.sessions.retrieve(
        transaccionb.idpago
    );
    await transactionSchema.updateOne({ _id: idt }, {
        $set: {
            statusTransaction: "Complete",
            monto: session.amount_total
        }
    })
    const user = await userSchema.findOne({ email: findUser.emailUser })
    await userSchema.updateOne({ _id: user._id }, {
        $set: {
            monto: user.monto + transaccionb.monto
        }
    })
    return res.status(200).send({ response: "Success", message: "Donacion realizada" })
}