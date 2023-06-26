const joi = require("joi")
const { name, email, password, phone } = require("./validatingSchema")
const adminSchema = joi.object({
    name : name,
    email : email,
    password : password,
    phone : phone
})

module.exports = adminSchema