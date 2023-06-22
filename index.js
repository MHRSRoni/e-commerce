//dependencies
const express = require("express")
const securityConfig = require("./src/configs/securityConfig")
const corsConfig = require("./src/configs/corsConfig")
const { errorController } = require("./src/controllers/errorController")
const connectDatabase = require("./src/configs/databaseConfig")
const productRouter = require("./src/routers/productRouter")
const userRouter = require("./src/routers/userRouter")
const vendorRouter = require("./src/routers/vendorRouter")
const warehouseRouter = require("./src/routers/warehouseRouter")
const adminRouter = require("./src/routers/adminRouter")
const customerCareRouter = require("./src/routers/customerCareRouter")
const shipperRouter = require("./src/routers/shipperRouter")
// const adminRouter = require("./src/routers/adminRouter")
require("dotenv").config()  //dot-env


//creating app object
const app = express()

//appling configuration on the app
app.use(...securityConfig)
app.use(corsConfig())


app.use(express.json())

//router
app.use("/api/v1/user", userRouter)
app.use("/api/v1/vendor", vendorRouter)
// app.use("/api/v1/admin", adminRouter)
// app.use("/api/v1/customer-care", customerCareRouter)
// app.use("/api/v1/wirehouse", warehouseRouter)
// app.use("/api/v1/shipper", shipperRouter)

//not valid routes
app.use("*",(req, res, next)=>{
    next({code : 404, msg : "requested url doesn't exist"})
})


//error controller
app.use(errorController)

const PORT = process.env.PORT || 3000

// Starting listening
app.listen(PORT,
        ()=>{
            console.log("server is running on port " + PORT)
            connectDatabase();  //connecting database
        })   