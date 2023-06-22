//dependencies
const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    name : {
        type : String,
        minlength : 3,
        trim : true,
        required : true,
    },
    email : {
        type : String,
        minlength : 5,
        trim : true,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        minlength : 6,
        required : true,
    },
    role : {
        type : String,
        enum : ["customer"],
        default : "customer",
        required : true
    },
    address : {
        type : Object,
        street : String,
        holding : String,
        po : String,
        ps : String,
        dist : String,
        divi : String,
    },
},{
    timestamps : true,
    versionKey : false,
})

const UserModel = model("user", userSchema)

module.exports = UserModel