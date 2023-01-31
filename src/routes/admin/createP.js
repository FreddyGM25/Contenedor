const bcrypt = require('bcryptjs')
const userSchema = require('../../models/usuario')
const { TokenAssign, TokenVerify } = require('../../middleware/autentication')
const { getTemplate, sendEmail } = require('../../middleware/email')

module.exports = async function (req, res) {
    const token = req.headers.authorization.split(' ').pop()
    if (token != "null") {
        const tokenver = await TokenVerify(token)
        const admin = await userSchema.findById(tokenver._id)
        if (admin.rol == "admin") {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashPassword;
            const ver = await userSchema.findOne({ email: req.body.email })
            if (ver == null) {
                const user = new userSchema({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.email,
                    password: req.body.password,
                    isActive: false,
                    imgpro: {
                        fileName: "defaultimage.png",
                        filePath: `${process.env.URLB}/serverimg/defaultimage.png`,
                        fileType: "image/png"
                    },
                    rol: "paciente"
                });
                await user.save()
                const token = await TokenAssign(user)
                const template = getTemplate(user.name, token, "", "", 1);
                const resp = await sendEmail(user.email, template, 1, "");
                if (resp == false) return res.status(200).send({ response: "Error", message: "Error al enviar el email" })
                res.cookie('token', token, { httpOnly: true });
                return res.status(200).send({ response: "Success", message: `${user.rol} creado correctamente` })
            } else {
                return res.status(200).send({ response: "Error", message: "El usuario ya existe" })
            }
        } else {
            return res.status(200).send({ response: "Error", message: "Este es un usuario normal" })
        }
    } else {
        return res.status(200).send({ response: "Error", message: "Esta operacion requiere autenticacion" })
    }
}