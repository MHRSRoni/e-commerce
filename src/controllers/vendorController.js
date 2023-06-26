const vendorModel = require("../models/vendorModel")
const bcrypt = require("bcrypt")
const vendorValidSchema = require("../middlewares/validator/vendorSchema")
const generateToken = require("../utils/generateToken")

// exports.signup = async (req, res, next) =>{
//     const result = vendorValidSchema.validate(req.body)
//     if(result.error){
//         next({code : 400, msg : result.error.message})
//     }
//     const {
//         name = "",
//         email = "",
//         password = "",
//         contact_no = null,
//         personal_info = {},
//         shop = []
//     }   = req.body 
//     const hassedPassword = await bcrypt.hash(password,10)

//     const vendor = new vendorModel({
//         name,
//         email,
//         password : hassedPassword,
//         contact_no,
//         personal_info,
//         shop
//     })
//     await vendor.save()
//     .then(data=>{
//             res.json(vendor)
//     })
//     .catch(err=>{
//             next({err})
//         }
//     )
// }


// exports.login = async (req, res, next) =>{
//     const {email = "", password = ""} = req.body
//     if(!email || !password){next({code : 400, msg : "fill all the field"})}
//     const vendor = await vendorModel.findOne({email})
//     if(!vendor){next({code : 400, msg : "user doesn't exist"})}
//     else{
//        const passMatch = await bcrypt.compare(password, vendor.password)
//        if(!passMatch){next({code : 401, msg : "unauthorized"})}
//        else{
//         const token = generateToken(vendor)
//         const resObj = {
//             msg : "welcome " + vendor.name,
//             access_token : token,
//             type : "Bearer token",
//             valitTill : "7days"
//         }
//         res.json(resObj)
//        }
//     }
// }