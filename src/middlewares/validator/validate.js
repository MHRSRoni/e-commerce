const productSchema = require("./productSchema");
const userSchema = require("./userSchema");
const joi = require("joi");
const vendorValidSchema = require("./vendorSchema");



const validate = (req, res, next) => {

    let choosenSchema = ""
    const route = req.orginalUrl
    //choose Schema according to the route
    if(route === "/api/v1/user/signup" || route === "/api/v1/user/signup/"){choosenSchema = userSchema}
    if(route === "/api/v1/products" || route === "/api/v1/products/"){choosenSchema = productSchema}
    if(route === "/api/v1/vendor/signup" || route === "/api/v1/vendor/signup/"){choosenSchema = vendorValidSchema}


    const validData = {}
    Object.keys(choosenSchema).forEach(field => {
        const {value, error} = choosenSchema[field].validate(req.body[field])
        if(error){next({code : 400, msg : error.details[0].message})}
        validData[field] = value
    })
    req.validData = validData
    next()
}

module.exports = validate