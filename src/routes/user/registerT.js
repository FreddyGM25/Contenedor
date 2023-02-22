const bcrypt = require('bcryptjs')
const userSchema = require('../../models/usuario')
const { TokenAssign } = require('../../middleware/autentication')
const { getTemplate, sendEmail } = require('../../middleware/email')
const { calcularEdad } = require('../../middleware/calcedad')

module.exports = async function (req, res) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;
    const ver = await userSchema.findOne({ email: req.body.email })
    const edad = await calcularEdad(req.body.fechanac)
    if(edad == 0) return res.status(200).send({ response: "Error", message: "Error en la fecha de nacimiento" })
    if (ver == null || ver == undefined) {
        const user = new userSchema({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: req.body.password,
            fecha: req.body.fechanac,
            edad: edad,
            genero: req.body.genero,
            tarjetap: req.body.tarjetap,
            identificacion: req.body.identificacion,
            isActive: false,
            isFirst: true,
            imgpro: {
                fileName: "defaultimage.png",
                filePath: `${process.env.URLB}/serverimg/defaultimage.png`,
                fileType: "image/png"
            },
            rol: "terapeuta"
        });
        await user.save()
        res.cookie('token', token, { httpOnly: true });
        return res.status(200).send({ response: "Success", message: `${user.rol} creado correctamente`})
    } else {
        return res.status(200).send({ response: "Error", message: "El usuario ya existe" })
    }
}