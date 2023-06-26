const { changePassword, getProfile, deleteProfile, login, changeEmail, signup, otpSend, verifyOtp, resetPassword } = require("../controllers/commonController")
const authorize = require("../middlewares/auth")
const validate = require("../middlewares/validator/validate")
const roleCheck = require("../utils/roleCheck")
const orderRouter = require("./orderRouter")
const productRouter = require("./productRouter")

const vendorRouter = require("express").Router()

//account
vendorRouter.post("/signup",validate("vendorSchema"), signup("vendor"))
vendorRouter.post("/login", login("vendor"))
vendorRouter.put("/change-password", authorize, roleCheck(["vendor"]), changePassword)
vendorRouter.get("/send-otp",authorize,roleCheck(["vendor"]), otpSend)    //send otp
vendorRouter.post("/verify-otp",authorize,roleCheck(["vendor"]), verifyOtp)    //verify otp
vendorRouter.put("/reset-password",authorize,roleCheck(["vendor"]), resetPassword)    //reset password
vendorRouter.put("/change-email", authorize, roleCheck(["vendor"]), changeEmail)
vendorRouter.get("/profile", authorize, roleCheck(["vendor"]), getProfile)
vendorRouter.delete("/profile", authorize, roleCheck(["vendor"]), deleteProfile)
vendorRouter.put("/profile/:id")

//product
vendorRouter.use("/products", authorize, productRouter)


//order
vendorRouter.use("/order", authorize, orderRouter)


module.exports = vendorRouter