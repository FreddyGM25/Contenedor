const mongoose = require("mongoose")

const citaSchema = mongoose.Schema({
    terapeuta: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    nomt: {
        type: String,
        required: true
    },
    paciente: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    nomp: {
        type: String,
        required: true
    },
    numta: {
        type: Number
    },
    numtf: {
        type: Number
    },
    fechai: {
        type: Date,
        required: true
    },
    fechaf: {
        type: Date,
        required: true
    },
    idpago: {
        type: mongoose.Types.ObjectId
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Cita', citaSchema)
