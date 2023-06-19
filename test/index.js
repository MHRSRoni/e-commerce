const express = require("express")


const app = express()
app.use("/",)
try {
    app.listen(4000)
    
} catch (err) {
    console.log(err.code)
    
}
