const userSchema = require('../../../models/usuario')

module.exports = async function (req, res) {

    return userSchema.find({rol: "paciente"})
        .then((data) => res.status(200).send({ response: "Success", datainfo: data }))
        .catch((error) => res.status(200).send({ response: "Error", message: error }));

}