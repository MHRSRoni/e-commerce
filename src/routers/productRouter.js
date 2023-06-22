const { getAllProduct, createProduct, getProductByCatagory, getAllProductVendor } = require("../controllers/productController")

//dependencies 
const express = require("express")
const authorize = require("../middlewares/auth")
const { isVendor, isCustomer } = require("../middlewares/roleCheck")
const productValidSchema = require("../middlewares/validator/productSchema")
const roleCheck = require("../utils/roleCheck")
const validate = require("../middlewares/validator/validate")
const productRouter = express.Router()


//customer
productRouter.get("/", getAllProduct)

//vendor
productRouter.get("/", authorize, roleCheck(["vendor"]), getAllProductVendor)
productRouter.post("/", roleCheck(["vendor"]), validate("productSchema"), createProduct)
productRouter.get("/:catagory",authorize,roleCheck(["customer", "vendor"]), getProductByCatagory)

//exporting
module.exports = productRouter