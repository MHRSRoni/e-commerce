const {Schema, model} = require("mongoose")

const transectionSchema = new Schema({
    orderId : {
        type : Schema.Types.ObjectId,
        ref : "order",
        required : true,
    },
    type : {
        type : String,
        enum : ["sell","refund",],
        default : "sell"
    },
    payment : {
        type : Object,
        required : true,
        mehod : {
            type : String,
            enum : ["bkash","rocket","nogod","bank"],
            required : true,
        },
        id : {
            type : String,
            required : true,
        }
    }

},{versionKey : false, timestamps : true})

const TransectionModel = model("transection", transectionSchema)

module.exports = TransectionModel