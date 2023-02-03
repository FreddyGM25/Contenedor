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
    }
},
{timestamps: true}
)

module.exports = mongoose.model('Terapia', terapiaSchema)
