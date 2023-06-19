//dependencies
const jwt = require("jsonwebtoken")
require("dotenv").config()

const generateToken = (user) =>{
    const {_id ="", role = "", name = ""} = user
    if(!_id || !role){
        throw {code : 401, msg : "unauthorized"}
    }
    const token = jwt.sign({_id, name, role}, process.env.SECRET_KEY,{expiresIn : "7d"})
    return token
}

module.exports = generateToken