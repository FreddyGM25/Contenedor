const userSchema = require('../../../models/usuario')
const blogSchema = require('../../../models/blog')
const { TokenVerify } = require('../../../middleware/autentication')
const fs = require('fs').promises

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    if (token != "null") {
        const tokenver = await TokenVerify(token)
        const admin = await userSchema.findById(tokenver._id)
        if (admin.rol == "admin") {
            const post = await blogSchema.findById(req.params.id)
            fs.unlink('./src/images/post/' + post.img.fileName)
            return blogSchema.remove({ _id: req.params.id })
                .then((data) => res.status(200).send({ response: "Success", message: "Se ha eliminado correctamente" }))
                .catch((error) => res.status(200).send({ response: "Error", message: error }));

        }
    } else {
        return res.status(200).send({ response: "Error", message: "Este es un usuario normal" })
    }
}