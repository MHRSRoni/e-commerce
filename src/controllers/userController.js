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


//login existing user
exports.login = async (req, res, next) => {
    const {email = "", password = ""} = req.body
    if(!email){next({code : 400, msg : "fill all the field"})}
    if(!password){next({code : 400, msg : "fill all the field"})}
    const user = await UserModel.findOne({email})
    if(!user){next({code : 404, msg : "user not exist"})}
    else{
        const passMatch = await bcrypt.compare(password, user.password)
        if(!passMatch){next({code : 400, msg : "verification failed"})}
        else{
            const token = generateToken(user)
        console.log(`====> user logged : ${user.role} ${user._id}`)
                res.json({
                name : user.name,
                email : user.email,
                access_token : token,
                valid_for : "7d"
            })
        }
    }
}

//get profile
exports.getProfile = async (req, res, next) =>{
    try {
        const userId = req.user._id
        const user = await UserModel.findById(userId,{_id : 0, name : 1, email : 1, role : 1, createdAt : 1})
        res.json(user)
        
    } catch (err) {
        next(err)   
    }
}

