//dependencies for user controller
const UserModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const  generateToken  = require("../utils/generateToken")

//sign up new user
exports.signup = async (req, res, next) =>{
    try {
        const {name = "", email = "", password = ""} = req.validData
        const hashedPassword = await bcrypt.hash(password, 10)  //hashing the pass
        const existUser = await UserModel.findOne({email})  //checking if user exist
        if(existUser){next({code : 400, msg : "Email already exist"})}
        else{
            const user = UserModel({    //creating user 
                name,
                email,
                password: hashedPassword,
            })
            await user.save()   //saving user to database
            .then(()=>{
                const {_id, name, email, role, createdAt} = user
                console.log("====> user created : " + _id)
                res.json({_id,name,email,createdAt})
    
            })
            .catch((err)=>next({code : 400, msg : err}))
        }
        
    } catch (err) {
        next(err)
    }
}





//get profile




//update profile


