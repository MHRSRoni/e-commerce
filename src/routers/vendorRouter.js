const { changePassword, getProfile, deleteProfile, login, changeEmail } = require("../controllers/commonController")
const { signup, } = require("../controllers/vendorController")
const authorize = require("../middlewares/auth")
const { isVendor } = require("../middlewares/roleCheck")
const validate = require("../middlewares/validator/validate")
const roleCheck = require("../utils/roleCheck")
const orderRouter = require("./orderRouter")
const productRouter = require("./productRouter")

const vendorRouter = require("express").Router()

//account
vendorRouter.post("/signup",validate, signup)
vendorRouter.post("/login", login("vendor"))
vendorRouter.put("/change-password", authorize, roleCheck(["vendor"]), changePassword)
vendorRouter.put("/change-email", authorize, roleCheck(["vendor"]), changeEmail)
vendorRouter.get("/profile", authorize, roleCheck(["vendor"]), getProfile)
vendorRouter.delete("/profile", authorize, roleCheck(["vendor"]), deleteProfile)
vendorRouter.put("/profile/:id")

//product
vendorRouter.use("/products", authorize, productRouter)


//order
vendorRouter.use("/order", authorize, orderRouter)


module.exports = vendorRouter