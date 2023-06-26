const UserModel = require("../models/userModel")
const VendorModel = require("../models/vendorModel")
const OtpModel = require("../models/otpModel")
const bcrypt = require("bcrypt")
const generateToken = require("../utils/generateToken")
const generateOtp = require("../utils/generateOtp")
const sendMail = require("../utils/sendMail")
const AdminModel = require("../models/adminModel")
const WarehouseModel = require("../models/warehouseModel")
require("dotenv").config()

//chose model according to role
const selectModel = (role) =>{
    const chosenModel = 
        (role === "customer" ?  UserModel : 
        role === "vendor" ? VendorModel :
        role === "admin" ? AdminModel :
        role === "warehouse" ? WarehouseModel :  "")
        return chosenModel
}


//sign up new user
exports.signup = (role) =>{
    const chosenModel = selectModel(role)
    return async (req, res, next) =>{
        try {
            const {password = "", email } = req.validData
            const existUser = await chosenModel.findOne({email})  //checking if user exist
            if(existUser){next({code : 400, msg : "Email already exist"})}
            else{
                const hashedPassword = await bcrypt.hash(password, 10)  //hashing the pass
                req.validData.password = hashedPassword
                const user = chosenModel(req.validData)
                await user.save()   //saving user to database
                .then(()=>{
                    const {_id, name, email, role, createdAt} = user
                    console.log("====> user created : " + _id)
                    res.json({_id,name,email,role,createdAt})
        
                })
                .catch((err)=>next({code : 400, msg : err}))
            }
            
        } catch (err) {
            // next(err)
            res.josn(err)
        }
    }
}

//login 
exports.login = (role) =>{
    return async (req, res, next) => {
        const chosenModel = selectModel(role)
        const {email = "", password = ""} = req.body
        if(!email){next({code : 400, msg : "fill all the field"})}
        if(!password){next({code : 400, msg : "fill all the field"})}
        const user = await chosenModel.findOne({email})
        if(!user){next({code : 404, msg : "user not exist"})}
        else{
            const passMatch = await bcrypt.compare(password, user.password)
            if(!passMatch){next({code : 400, msg : "verification failed"})}
            else{
                const token = generateToken(user)
            console.log(`====> user logged : ${user.role} ${user._id}`)
                    res.json({
                    msg : "welcome " + user.name,
                    access_token : token,
                    type : "bearer token",
                    valid_for : "7d"
                })
            }
        }
    }
}

//changePassword
exports.changePassword = async (req, res, next) => {

    const {_id, role} = req.user
    const chosenModel = selectModel(role)
    const {password, newPassword, confirmPassword} = req.body
    if(!password || !newPassword || !confirmPassword){next({code : 400, msg: "fill all the field"})}
    if(password === newPassword ){next({code : 400, msg: "enter a new password"})}
    else{
        if(newPassword === confirmPassword){
        const user = await chosenModel.findById(_id,{_id : 0,password : 1})
        const match = await bcrypt.compare(password, user.password)
            if(!match){
                next({code : 400, msg : "wrong password"})
            }
            else{
                const hashedPassword = await bcrypt.hash(newPassword, 10)
                const userUpdate = await chosenModel.findByIdAndUpdate(_id,{"password" : hashedPassword})
                res.json({"msg" : "password updated successfully"})
            }
        }
        else{
            next({code : 400, msg : "password didn't match"})
        }
    }
    
}

//changeEmail
exports.changeEmail = async (req, res, next) => {
    const {_id, role} = req.user
    const chosenModel = selectModel(role)
    const {newEmail, password} = req.body
    if(!newEmail || !password){next({code : 400, msg: "fill all the field"})}
    else{
        const user = await chosenModel.findById(_id,{_id : 0,password : 1})
        if(!user){next("user not found")}
        else{
        const match = await bcrypt.compare(password, user.password)
            if(!match){
                next({code : 400, msg : "wrong password"})
            }
            else{
                try {
                    const userUpdate = await chosenModel.findByIdAndUpdate(_id,{"email" : newEmail})
                    res.json({"msg" : "email updated successfully"})
                } catch (error) {
                    next({code : 400, msg : "email is taken" })
                }
            }
        }
    }
}

//getProfile
exports.getProfile = async (req, res, next) =>{
    const {_id, role} = req.user
    const chosenModel = selectModel(role)
    try {
        const user = await chosenModel.findById(_id,{_id : 0, name : 1, email : 1, createdAt : 1})
        res.json(user)
        
    } catch (err) {
        next(err)   
    }
}

//delete profile
exports.deleteProfile = async (req, res, next) =>{
    const {role} = req.user
    const chosenModel = selectModel(role)
    try {
        const userId = req.user._id
        const user = await chosenModel.findByIdAndDelete(userId)
        if(user){
            res.json({msg : "deleted successfully", data : {name : user.name, email : user.email}})
        }
        else{next("user not found")}
        
    } catch (err) {
        next(err)   
    }
}

exports.addAddress = async (req, res, next) => {
    const {role, _id} = req.user
    const chosenModel = selectModel(role)
    const {address} = req.validData 
    const updateUser = await chosenModel.findByIdAndUpdate(_id,{address : address})
    res.json(updateUser)
}

//reset password
exports.resetPassword = async (req, res, next) => {

    const {_id, role} = req.user
    const otpObj = await OtpModel.findOneAndDelete({"userId" : _id,"status" : "verified"})
    if(!otpObj){next({code:400, msg: "otp expired or not verified"})}
    else {
        const chosenModel = selectModel(role)
        const { newPassword, confirmPassword} = req.body
        if(!newPassword || !confirmPassword){next({code : 400, msg: "fill all the field"})}
        else{
            if(newPassword === confirmPassword){
            const user = await chosenModel.findById(_id,{_id : 0,password : 1})
                const hashedPassword = await bcrypt.hash(newPassword, 10)
                const userUpdate = await chosenModel.findByIdAndUpdate(_id,{"password" : hashedPassword})
                res.json({"msg" : "password updated successfully"})
            }
            else{
                next({code : 400, msg : "password didn't match"})
            }
        }
    }
    
}

//otp send
exports.otpSend = async (req, res, next) => {
    const {_id} = req.user
    const otpObjExist = await OtpModel.findOneAndDelete({"userId" : _id})
    console.log(otpObjExist)
    const otp = generateOtp()
    const otpObj = new OtpModel({
        userId : _id,
        otp
    })
    await otpObj.save()
    const mail = {
        from : `E-Commerce : <${process.env.email}>`,
        to : "mdmonirhosen.roni04@gmail.com",
        subject : "reset password",
        text : `You have requested for reseting password. Your otp code is ${otp}. If you didn't requested for reseting password you can ignore it safely`
    }
    const status = sendMail(mail)
    status ? res.json({msg : "successfull",data : "check your email for otp","fornow" : otp}) : next("err")
}

//verifi otp
exports.verifyOtp = async (req, res, next) => {
    const {otp} = req.body
    const {_id} = req.user
    if(!otp){next({code: 400, msg: "please enter otp first"})}
    else{
        const otpObj = await OtpModel.findOne({"userId" : _id})
        if(!otpObj){next({code:400, msg: "otp expired"})}
        else{
            if(otpObj.otp === otp){
                otpObj.status = "verified",
                await otpObj.save()
                res.json({status : "OTP verified"})
            }else{
                next({code: 401, msg : "incorrect otp"})
            }
        }
    }
}