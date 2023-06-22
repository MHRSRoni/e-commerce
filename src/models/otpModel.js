const {Schema, model, SchemaType} = require("mongoose")

const otpSchema = new Schema({
    user : {
        type : Object,
        userId : Schema.Types.ObjectId,
        role : {
            type : String,
        },
        required : true,
    },
    otp : {
        type : String,
        required : true,
        minlength : 4,
        maxlength : 4,
    },
    status : {
        type : String,
        required : true,
        enum : ["waiting", "verified"],
        default : "waiting"
    },
    createdAt : {
        type : Date,
        expires : 3000000,
        default : Date.now()
    }
},{
    versionKey : false,
})


const OtpModel = model("otp", otpSchema)

module.exports = OtpModel