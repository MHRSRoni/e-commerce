const {Schema, model} = require("mongoose")

const complainSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : "Customer",
        required : true,
    },
    orderId : {
        type : Schema.Types.ObjectId,
        ref : "Order",
    },
    complain : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        enum : ["pending", "working", "successful"],
        default : "pending"
    }
})

const ComplainModel = model("complain", complainSchema)

module.exports = ComplainModel