const { getAllProduct, createProduct, getProductByCatagory, getAllProductVendor } = require("../controllers/productController")

//dependencies 
const express = require("express")
const authorize = require("../middlewares/auth")
const validate = require("../middlewares/validator/validate")
const { isVendor, isCustomer } = require("../middlewares/roleCheck")
const productValidSchema = require("../middlewares/validator/productSchema")
const roleCheck = require("../utils/roleCheck")
const productRouter = express.Router()


//customer
productRouter.get("/", getAllProduct)

//vendor
productRouter.get("/", authorize,isVendor, getAllProductVendor)
productRouter.post("/", isVendor,productValidSchema, createProduct)
productRouter.get("/:catagory",authorize,roleCheck(["customer"]), getProductByCatagory)

//exporting
module.exports = productRouter