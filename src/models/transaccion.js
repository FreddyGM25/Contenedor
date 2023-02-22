const mongoose = require("mongoose")

const transaccionSchema = mongoose.Schema({
    idterapeuta: {
        type: String,
        required: true
    },
    tipo: {
        type: Boolean
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    cantidadh: {
        type: Number,
        required: true
    },
    statusTransaction: {
        type: String
    },
    idpago: {
        type: String
    }
}, { timestamp: true })

module.exports = mongoose.model('Transaccion', transaccionSchema)