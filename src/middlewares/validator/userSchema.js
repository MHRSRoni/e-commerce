//dependencies for validation
const joi = require("joi")

const userSchema = joi.object({
    //name field
    name : joi.string().trim().alphanum().required().min(3).max(20)
            .messages({
                "string.base" : "enter a valid name",
                "string.alphanum" : "enter a valid name",
                "string.min" : "name must contain 3 character",
                "any.required" : "must enter a name",
                "string.max" : "name must not be longer than 20 character",
            }),

    //email field
    email : joi.string().trim().email({
        minDomainSegments : 2,
        maxDomainSegments : 3,
    }).max(40).required()
        .messages({
            "string.email" : "enter a valid email",
            "string.max" : "currently we support only 40 character long email",
            "any.required" : "must enter an email",
        })
        ,

    //password field
    password : joi.string().trim().required().min(6).max(18)
                .messages({
                    "string.base" : "enter a valid password",
                    "string.min" : "password must be 6 character long",
                    "string.max" : "password must be less than 18 character",
                    "any.required" : "must enter a password"
                }),
    role : joi.string().trim().valid("buyer", "seller")
                .messages({
                    "string.base" : "enter a valid role",
                    "any.only" : "enter a valid role"
                })
})

const userSchemaValidate = (req, res, next) =>{
    const result = userSchema.validate(req.body)
    if(result.error){
        next({code : 400, msg : result.error.message})
    }
    else{
        req.validData = result.value
        next()
    }
}
module.exports = userSchemaValidate