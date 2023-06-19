const warehouseRouter = require("express").Router()



warehouseRouter.get("/allProducts")
warehouseRouter.get("/order/:orderId")
warehouseRouter.get("/vendor/:vendorId")

module.exports = warehouseRouter
