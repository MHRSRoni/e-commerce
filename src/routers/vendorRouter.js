const { signup, login } = require("../controllers/vendorController")
const authorize = require("../middlewares/auth")
const { isVendor } = require("../middlewares/roleCheck")
const validate = require("../middlewares/validator/validate")
const roleCheck = require("../utils/roleCheck")
const orderRouter = require("./orderRouter")
const productRouter = require("./productRouter")

const vendorRouter = require("express").Router()

//account
vendorRouter.post("/signup",validate, signup)
vendorRouter.post("/login", login)
vendorRouter.put("/profile/:id")
vendorRouter.delete("/profile/:id")

//product
vendorRouter.use("/products", authorize, productRouter)


//order
vendorRouter.use("/order", authorize, orderRouter)


module.exports = vendorRouter