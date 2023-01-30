const userSchema = require('../models/usuario')

async function verifyemail(email) {
    const user = await userSchema.findOne({email: email})
    if(user != null){
        return true
    }
    return false
}

module.exports = { verifyemail }