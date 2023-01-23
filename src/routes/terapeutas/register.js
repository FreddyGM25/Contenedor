const bcrypt = require('bcryptjs')
const pacienteSchema = require('../../models/usuario')
const { TokenAssign } = require('../../middleware/autentication')
const { getTemplate, sendEmail } = require('../../middleware/email')
const { calcularEdad } = require('../../middleware/calcedad')

module.exports = async function (req, res) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;
    const ver = await pacienteSchema.findOne({ email: req.body.email })
    if (ver == null) {
        const edad = await calcularEdad(req.body.fechanac)
        const especialidad = (req.body.especialidad).split(", ")
        console.log(especialidad)
        const paciente = new pacienteSchema({
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
            rol: "terapeuta",
            fechanac: req.body.fechanac,
            edad: edad,
            especialidad: especialidad
        });
        await paciente.save()
        const token = await TokenAssign(paciente)
        const template = getTemplate(paciente.name, token, "", "", 1);
        const resp = await sendEmail(paciente.email, template, 1, "");
        if (resp == false) return res.status(200).send({ response: "Error", message: "Error al enviar el email" })
        res.cookie('token', token, { httpOnly: true });
        return res.status(200).send({ response: "Success", message: "Terapeuta creado correctamente" })
    } else {
        return res.status(200).send({ response: "Error", message: "El usuario ya existe" })
    }
}