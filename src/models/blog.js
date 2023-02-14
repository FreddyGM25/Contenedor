const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    titulo:{
        type:String,
        required:true
    },
    cuerpo:{
        type:String,
        required:true
    },
    autor:{
        type:String,
        required:true
    },
    img: {
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
    }
},
{timestamps: true}
)

module.exports = mongoose.model('Blog', blogSchema)
