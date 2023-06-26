const productSchema = require("./productSchema");
const userSchema = require("./userSchema");
const joi = require("joi");
const vendorSchema = require("./vendorSchema");
const { address } = require("./validatingSchema");
const adminSchema = require("./adminSchema");
const { warehouse } = require("./warehouseSchema");



const validate = (schemaName) =>{
    let choosenSchema = (
    schemaName === "userSchema" ?  userSchema : 
    schemaName === "productSchema" ?  productSchema : 
    schemaName === "vendorSchema" ? vendorSchema : 
    schemaName === "adminSchema" ? adminSchema :
    schemaName === "warehouseSchema" ? warehouse : 
    schemaName === "address" ? address : ""
    )


    return (req, res, next) => {

        const result = choosenSchema.validate(req.body)
        if(result.error){
            next({code : 400, msg : result.error.message})
        }
        else{
            req.validData = result.value
            next()
        }
}
}
module.exports = validate



// Object.keys(choosenSchema).forEach(field => {
//     const {value, error} = choosenSchema[field].validate(req.body[field])
//     if(error){next({code : 400, msg : error.details[0].message})}
//     validData[field] = value
// })
