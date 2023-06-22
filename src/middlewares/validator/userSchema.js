//dependencies for validation
const joi = require("joi")
const { name, email, password, role } = require("./validatingSchema")

const userSchema = joi.object({
    name : name,
    email : email,
    password : password,
    role : role
})


module.exports = userSchema