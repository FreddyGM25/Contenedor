const userSchema = require('../../models/user')
const bcrypt = require('bcryptjs')
const { TokenVerify } = require('../../middleware/autentication')
const { verifyemail } = require('../../middleware/verify')

module.exports = async function (req, res) {
  const token = req.headers.authorization.split(' ').pop()
  if (token != "null") {
    const tokenver = await TokenVerify(token)
    const admin = await userSchema.findById(tokenver._id)
    if (admin.rol == "admin") {
      if (req.body.email) {
        const ver = await verifyemail(req.body.email)
        if (ver) res.status(200).send({ response: "Success", message: "Este email se encuentra en uso" })
      }
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;
      }
      const user = await userSchema.findOne({ email: req.body.email })
      await userSchema.updateOne({ _id: user._id }, {
        $set: {
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          email: req.body.email,
          password: req.body.password
        }
      })
      return res.status(200).send({ response: "Success", message: "Cambios guardados correctamente" })


    } else {
      return res.status(200).send({ response: "Error", message: "Este es un usuario normal" })
    }

  } else {
    return res.status(200).send({ response: "Error", message: "Esta operacion requiere autenticacion" })
  }
}
