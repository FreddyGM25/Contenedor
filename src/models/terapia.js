const mongoose = require("mongoose")

const terapiaSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    tipo:{
        type:String,
        required:true
    },
    cantidad:{
        type:Number,
        required:true
    },
    precio:{
        type:Number,
        required:true
    },
    idterapeuta:{
        type: mongoose.Types.ObjectId,
        required:true
    },
    idprecio:{
        type:String
    }
},
{timestamps: true}
)

module.exports = mongoose.model('Terapia', terapiaSchema)
