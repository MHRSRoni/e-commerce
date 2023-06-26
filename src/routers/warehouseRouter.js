const { changePassword, otpSend, verifyOtp, resetPassword, changeEmail, addAddress, getProfile, deleteProfile, login, signup } = require("../controllers/commonController")
const authorize = require("../middlewares/auth")
const validate = require("../middlewares/validator/validate")
const roleCheck = require("../utils/roleCheck")

const warehouseRouter = require("express").Router()


warehouseRouter.post("/signup",validate("warehouseSchema"), signup("warehouse"))   //signup
warehouseRouter.post("/login", login("warehouse"))    //login
warehouseRouter.put("/password",authorize,roleCheck(["warehouse"]), changePassword)    //changePassword
warehouseRouter.get("/send-otp",authorize,roleCheck(["warehouse"]), otpSend)    //send otp
warehouseRouter.post("/verify-otp",authorize,roleCheck(["warehouse"]), verifyOtp)    //verify otp
warehouseRouter.put("/reset-password",authorize,roleCheck(["warehouse"]), resetPassword)    //reset password
warehouseRouter.put("/email",authorize,roleCheck(["warehouse"]), changeEmail)    //changeEmail
warehouseRouter.put("/address",authorize,roleCheck(["warehouse","customer"]),validate("address"), addAddress)    //add address
warehouseRouter.get("/profile", authorize, roleCheck(["warehouse","admin","customer"]), getProfile)   //view profile
warehouseRouter.delete("/profile", authorize, roleCheck(["warehouse"]), deleteProfile)   //view profile
warehouseRouter.get("/allProducts")
warehouseRouter.get("/order/:orderId")
warehouseRouter.get("/vendor/:vendorId")

module.exports = warehouseRouter
