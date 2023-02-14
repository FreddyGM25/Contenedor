const userSchema = require('../../../models/usuario')
const blogSchema = require('../../../models/blog')
const { TokenVerify } = require('../../../middleware/autentication')

module.exports = async function (req, res) {
    
    return blogSchema.find()
        .then((data) => res.status(200).send({ response: "Success", datainfo: data }))
        .catch((error) => res.status(200).send({ response: "Error", message: error }));

}