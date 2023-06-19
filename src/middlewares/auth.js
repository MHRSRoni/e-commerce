//dependencies
const jwt = require("jsonwebtoken")
require("dotenv").config()

const authorize = (req, res, next) => {
    const tokenContainer = req.headers.authorization
    if(!tokenContainer){next({code : 401, msg : "Authorization failed"})}
    else{
        const token = tokenContainer.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            if(!err){
                console.log("authorized user : " + decoded.name)
                req.user = decoded
                next()
                return null
            }
            else{
                console.log(err)
                next({code : 401, msg : "Authorization failed"})
            }
        })
    }

}

module.exports = authorize
