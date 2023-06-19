const { signup, login } = require("../controllers/vendorController")
const authorize = require("../middlewares/auth")
const { isVendor } = require("../middlewares/roleCheck")
const validate = require("../middlewares/validator/validate")
const orderRouter = require("./orderRouter")
const productRouter = require("./productRouter")

const vendorRouter = require("express").Router()

//account
vendorRouter.post("/signup",validate, signup)
vendorRouter.post("/login", login)
vendorRouter.put("/profile/:id")
vendorRouter.delete("/profile/:id")

//product
vendorRouter.get("/products", authorize, isVendor, (req, res, next)=>{req.url = "/vendor", productRouter(req, res, next)})


//order
vendorRouter.get("/order", authorize, isVendor, (req, res, next)=>{req.url = "/"; orderRouter.handle(req, res, next)})
vendorRouter.get("/order/:status", authorize, isVendor, (req, res, next)=>{req.url = "/";orderRouter.handle(req, res, next)})

module.exports = vendorRouter