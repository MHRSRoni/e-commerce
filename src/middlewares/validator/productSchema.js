//dependencies
const joi = require("joi")

const productSchema = joi.object({
    catagory : joi.string().trim().valid("food", "cosmetic", "electric", "electonic", "toy").required()
                .messages({
                    "string.base" : "enter a valid catagory",
                    "any.only" : "choose one of the valid catagory",
                    "any.required" : "must enter a catagory"
                }),
    name : joi.string().trim().min(3).max(30).required()
                .messages({
                    "string.base" : "enter a valid name",
                    "string.min" : "name must be 3 charecter long",
                    "string.max" : "name must be not more than 15 character long",
                    "any.required" : "must enter a name"
                }),
    price : joi.number().min(0).required()
                .messages({
                    "number.base" : "enter a valid price",
                    "number.min" : "minimum price should be 0",
                    "any.required" : "must enter a price",
                }),
    quantity : joi.number().min(10).required()
                    .messages({
                        "number.base" : "enter a valid quantity",
                        "number.min" : "minimum quantity should be 10",
                        "any.required" : "must enter the quantity",
                    }),
})


const productValidSchema = (req, res, next) =>{
    const result = productSchema.validate(req.body)
    if(result.error){
        next({code : 400, msg : result.error.message})
    }
    else{
        req.validData = result.value
        next()
    }
}

module.exports = productValidSchema