const userSchema = require('../../models/usuario')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    if (token != "null") {
        const tokenver = await TokenVerify(token)
        const admin = await userSchema.findById(tokenver._id)
        if(admin.rol == "admin") {
            return userSchema.find({rol: "terapeuta"})
            .then((data) => res.status(200).send({ response: "Success", datainfo: data }))
            .catch((error) => res.status(200).send({ response: "Error", message: error }));
    
        }
    }
}