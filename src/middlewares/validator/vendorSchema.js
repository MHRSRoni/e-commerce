const joi = require("joi")
const { models } = require("mongoose")
const { name, password, phone, email } = require("./validatingSchema")

const address = joi.object({
    street_no : joi.string().trim().max(30).required(),

})

const bank_info = joi.object({
    bank_name : joi.string().trim().required(),
    account_no : joi.string().trim().required(),
})

const shop = joi.object({
    name : joi.string().trim().required(),
    liccense_no : joi.string().trim().required(),
    address : address.required(),
})

//main schema
const vendorSchema = joi.object({
    name : name,
    email: email,
    password : password,
    contact_no : phone,
    
})

module.exports = vendorSchema