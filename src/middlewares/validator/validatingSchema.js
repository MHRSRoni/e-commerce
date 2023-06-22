const joi = require("joi")

const validRole = ["customer","admin","customer_care","warehouse","shipper"]

exports.name = joi.string().trim().min(6).max(20).regex(/^[A-Za-z ]+$/).required().
                messages({
                    "string.base" : "enter a valid name",
                    "string.min" : "name must be more than 6 leter",
                    "string.pattern.base" : "Only leter are allowed",
                    "string.max" : "name must be less than 6 leter",
                    "any.required" : "must enter a name field"
                })

exports.email = joi.string().trim().email().required()
                .messages({
                    "string.base" : "enter a valid email",
                    "string.email" : "enter a valid email",
                    "string.empty" : "enter a valid email",
                    "any.required" : "must enter a email field"
                })

exports.password = joi.string().trim().required().min(6).max(18)
                    .messages({
                        "string.base" : "enter a valid password",
                        "string.min" : "password must be 6 character long",
                        "string.max" : "password must be less than 18 character",
                        "any.required" : "must enter a password"
                    })

exports.role = joi.string().trim().valid(...validRole)
                    .messages({
                        "string.base" : "enter a valid role",
                        "any.only" : "enter a valid role"
                    })

exports.address = joi.object({
    street : joi.string().trim().max(20).required(),
    holding : joi.string().trim().max(20).required(),
    po : joi.string().trim().max(20).required(),
    ps : joi.string().trim().max(20).required(),
    dist : joi.string().trim().max(20).required(),
    divi : joi.string().trim().max(20).required(),
})