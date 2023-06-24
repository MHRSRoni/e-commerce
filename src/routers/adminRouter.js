const { changePassword, otpSend, verifyOtp, resetPassword, changeEmail, addAddress, getProfile, deleteProfile, login } = require("../controllers/commonController")
const { signup } = require("../controllers/userController")
const authorize = require("../middlewares/auth")
const validate = require("../middlewares/validator/validate")
const roleCheck = require("../utils/roleCheck")

const adminRouter = require("express").Router()




// adminRouter.post("/signup", signup)
adminRouter.post("/signup",validate("adminSchema"), signup)   //signup
adminRouter.post("/login", login("admin"))    //login
adminRouter.put("/password",authorize,roleCheck(["admin"]), changePassword)    //changePassword
adminRouter.get("/send-otp",authorize,roleCheck(["admin"]), otpSend)    //send otp
adminRouter.post("/verify-otp",authorize,roleCheck(["admin"]), verifyOtp)    //verify otp
adminRouter.put("/reset-password",authorize,roleCheck(["admin"]), resetPassword)    //reset password
adminRouter.put("/email",authorize,roleCheck(["admin"]), changeEmail)    //changeEmail
adminRouter.put("/address",authorize,roleCheck(["admin"]),validate("address"), addAddress)    //add address
adminRouter.get("/profile", authorize, roleCheck(["admin"]), getProfile)   //view profile
adminRouter.delete("/profile", authorize, roleCheck(["admin"]), deleteProfile)   //view profile


module.exports = adminRouter