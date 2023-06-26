//dependencies
const {Schema, model} = require("mongoose")

const warehouseSchema = new Schema({
    name : {
        type : String,
        minlength : 6,
        maxlength : 30,
        required : true,

    },
    orderId : [{
        type : Schema.Types.ObjectId,
        ref : "order",
    
    }]
    ,
    address : {
        type : Object,
        required : true,
    }
},{timestamps :true, versionKey : false})

const WarehouseModel = model("warehouse" , warehouseSchema)

module.exports = WarehouseModel