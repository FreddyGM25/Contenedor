const userSchema = require('../../../models/usuario')
const bcrypt = require('bcryptjs')
const { TokenVerify } = require('../../../middleware/autentication')

module.exports = async function (req, res) {
  const token = req.headers.authorization.split(' ').pop()
  if (token != "null") {
    const tokenver = await TokenVerify(token)
    const admin = await userSchema.findById(tokenver._id)
    if (admin.rol == "admin") {
      const user = await userSchema.findById(req.body.id)
      if(user.rol != "terapeuta") return res.status(200).send({ response: "Error", message: "Este usuario no es terapeuta" })
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;
        await userSchema.updateOne({ _id: user._id }, {
          $set: {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: req.body.password
          }
        })
      } else {
        await userSchema.updateOne({ _id: user._id }, {
          $set: {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email
          }
        })
      }
      return res.status(200).send({ response: "Success", message: "Cambios guardados correctamente" })
    } else {
      return res.status(200).send({ response: "Error", message: "Este es un usuario normal" })
    }

  } else {
    return res.status(200).send({ response: "Error", message: "Esta operacion requiere autenticacion" })
  }
}
