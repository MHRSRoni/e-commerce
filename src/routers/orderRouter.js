const { createOrder, getAllOrderForVendor, getOrderByStatus } = require("../controllers/orderController")

const orderRouter = require("express").Router()




orderRouter.post("/", createOrder)
orderRouter.get("/", getAllOrderForVendor)
orderRouter.get("/:status", getOrderByStatus)


module.exports = orderRouter