//dependencies for product model
const {Schema, model} = require("mongoose")

//creating product schema
const productSchema = new Schema({
    catagory : {
        type : String,
        required : true,
        enum : ["food", "cosmetic", "electric", "electonic", "toy"]
    },
    name : {
        type : String,
        required : true,
        minlength : 3,
    },
    price : {
        type : Number,
        required : true,
        min : 0,
    },
    description : String,
    quantity : {
        type : Number,
        min : 10,
        required : true,
    },
    available : {
        //auto generate
        type : Number,
        min : 0,
        required : true,
    },
    vendorId : {
        //auto generate
        type : Schema.Types.ObjectId,
        ref : "vendor",
        required : true,
    },
    rating : {
        //auto generate
        type : Number,
        min : 0,
        max : 5,
        required : true,
        dafault : 0,
    }
},{
    timestamps : true,
    versionKey : false,
})

//creating product model
const ProductModel = model("product",   productSchema)

//exporting product model 
module.exports = ProductModel