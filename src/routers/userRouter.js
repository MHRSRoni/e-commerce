const { signup, login, getProfile } = require("../controllers/userController")
const userSchemaValidate = require("../middlewares/validator/userSchema")
const authorize = require("../middlewares/auth")
const orderRouter = require("./orderRouter")
const { isCustomer } = require("../middlewares/roleCheck")
const productRouter = require("./productRouter")
const roleCheck = require("../utils/roleCheck")

const userRouter = require("express").Router()

//before login
userRouter.post("/signup",userSchemaValidate, signup)   //signup
userRouter.use("/products", productRouter) //view products

//login
userRouter.post("/login", login)    //login


//after login
//account
userRouter.get("/profile", authorize, roleCheck(["customer"]), getProfile)   //view profile
// userRouter.put("/profile", authorize, isCustomer, updateProfile)   //update profile
// userRouter.delete("/profile", authorize, isCustomer, deleteProfile)   //delete profile
//order
userRouter.use("/order", authorize,roleCheck(["customer"]), orderRouter)



module.exports = userRouter