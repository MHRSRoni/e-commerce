const joi = require("joi")
const { models } = require("mongoose")

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
    name : joi.string().trim().min(6).max(32).required(),
    email: joi.string().trim().email().max(40).required(),
    password : joi.string().trim().min(8).max(128).required(),
    contact_no : joi.string().length(11).required(),
    personal_info : joi.object({
        address : address.required(),
        bank_info : bank_info.required(),
    }).required(),
    shop : joi.array().required().items(shop.required())
})

module.exports = vendorSchema