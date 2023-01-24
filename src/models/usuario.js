const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
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
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Password should be minimum of 8 characters']
    },
    imgpro: {
        fileName: {
            type: String,
        },
        filePath: {
            type: String,
        },
        fileType: {
            type: String,
        },
        fileSize: {
            type: String,
        }
    },
    rol: {
        type:String,
        required:true
    },
    isActive: {
        type:Boolean,
        required:true
    },
    especialidad:[{
        type:String
    }],
    fechanac:{
        type:Date,
    },
    edad:{
        type:Number,
    },
    preferencia: [{
        type:String
    }]
},
{timestamps: true}
)

module.exports = mongoose.model('User', userSchema)
