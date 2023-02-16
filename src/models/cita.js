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
    idterapia: {
        type: mongoose.Types.ObjectId
    },
    fecha: {
        type: Date,
        required: true
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Cita', citaSchema)
