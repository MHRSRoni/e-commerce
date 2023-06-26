//dependencies
const {Schema, model} = require("mongoose")

const adminSchema = new Schema({
    name : {
        type : String,
        minlength : 6,
        maxlength : 20,
        required : true,

    },
    phone : {
        type : String,
        minlength : 11,
        maxlength : 11,
        required : true,
    }
    ,
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    // personalInformation : {
    //     PO : String,
    //     PS : String,
    //     DIST : String,
    //     DIVI : String,
    //     type : Object,
    //     required : true,
    // },
    role : {
        type : String,
        enum : ["admin"],
        default : "admin"
    },
},{timestamps : true, versionKey : false})

const AdminModel = model("admin" , adminSchema)

module.exports = AdminModel