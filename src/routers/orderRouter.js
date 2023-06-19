const { createOrder, getAllOrderForVendor, getOrderByStatus } = require("../controllers/orderController")
const roleCheck = require("../utils/roleCheck")

const orderRouter = require("express").Router()




orderRouter.post("/", createOrder)
orderRouter.get("/",roleCheck(["vendor"]), getAllOrderForVendor)
orderRouter.get("/:status", getOrderByStatus)


module.exports = orderRouter