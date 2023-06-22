const {Schema, model} = require("mongoose")

const vendorSchema = new Schema({
    name : {
        type : String,
        minlength : 6,
        maxlength : 32,
        required : true,
    },
    email : {
        type : String,
        maxlength : 40,
        unique : true,
        required : true,
    },
    password : {
        type : String,
        minlength : 8,
        maxlength : 128,
        required : true,
    },
    contact_no : {
        type : String,
        minlength : 11,
        maxlength : 11,
        required : true,
    },
    personal_info :{
        address : {
            type : Object,
            street : String,
            holding : String,
            po : String,
            ps : String,
            dist : String,
            divi : String,
        },
        bank_info : {
            type : Array,
            bank_name : String,
            account_no : String,
        },
    },shop : {
        type : Array,
            name : String,
            license_no : String,
            address : {
                type : Object,
                street : String,
                holding : String,
                po : String,
                ps : String,
                dist : String,
                divi : String,
            },
        },
        role : {
            type : String,
            enum : ["vendor"],
            default : "vendor",
        },
},{
    timestamps : true , versionKey : false,
})


const VendorModel = model("vendor", vendorSchema)

module.exports = VendorModel