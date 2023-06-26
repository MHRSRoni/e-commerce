//dependencies
const authorize = require("../middlewares/auth")    //jwt authorize
const validate = require("../middlewares/validator/validate")   //input validation
const { changePassword, getProfile, deleteProfile, login, changeEmail, addAddress, otpSend, verifyOtp, resetPassword, signup } = require("../controllers/commonController")
//required router
const orderRouter = require("./orderRouter")
const productRouter = require("./productRouter")
const roleCheck = require("../utils/roleCheck")

//creating userRouter
const userRouter = require("express").Router()

//account
userRouter.post("/signup",validate("userSchema"), signup("customer"))   //signup
userRouter.post("/login", login("customer"))    //login
userRouter.put("/password",authorize,roleCheck(["customer"]), changePassword)    //changePassword
userRouter.get("/send-otp",authorize,roleCheck(["customer"]), otpSend)    //send otp
userRouter.post("/verify-otp",authorize,roleCheck(["customer"]), verifyOtp)    //verify otp
userRouter.put("/reset-password",authorize,roleCheck(["customer"]), resetPassword)    //reset password
userRouter.put("/email",authorize,roleCheck(["customer"]), changeEmail)    //changeEmail
userRouter.put("/address",authorize,roleCheck(["customer"]),validate("address"), addAddress)    //add address
userRouter.get("/profile", authorize, roleCheck(["customer"]), getProfile)   //view profile
userRouter.delete("/profile", authorize, roleCheck(["customer"]), deleteProfile)   //view profile


userRouter.use("/products", productRouter) //view products

//login


//after login
//account
// userRouter.put("/profile", authorize, isCustomer, updateProfile)   //update profile
// userRouter.delete("/profile", authorize, isCustomer, deleteProfile)   //delete profile
//order
userRouter.use("/order", authorize,roleCheck(["customer"]), orderRouter)



module.exports = userRouter