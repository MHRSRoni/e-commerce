//dependencies
const {Schema, model, SchemaType} = require("mongoose")

const orderSchema = new Schema({
    customerId : {
        type : Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    totalAmmount : {
        type : Number,
        required : true,
    },
    status : {
        type : String,
        enum : ["waiting", "processing", "rejected", "shiping", "reached", "out for deleviry"],
        default : "waiting"
    },
    products : {
        type : Array,
        required : true,
        vendorId : {
            type : Schema.Types.ObjectId,
            ref : "vendor",
            required : true,
        },
        productIds : [
            {
                type : SchemaType.ObjectId,
                ref : "product",
            }
        ],
        ammount : {
            type : Number,
            required : true,
        }
        
    },
    address : {
        type : Object,
        PO : String,
        PS : String,
        DIST : String,
        DIVI : String,
        required : true,
    },
    estimatedDelevary : {
        type : Schema.Types.Date,
    },
    deleveriedDate : Schema.Types.Date
},{
    timestamps : true, versionKey : false
})

const OrderModel = new model("order", orderSchema)

module.exports = OrderModel