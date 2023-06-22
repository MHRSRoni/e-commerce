const digit = 4

const generateOtp = () =>{
let otp = Math.floor(Math.random() * Math.pow(10,digit))
otp = otp < Math.pow(10,digit-1) ? otp + Math.pow(10,digit-1) :
    otp > Math.pow(10,digit) - 1 ? otp - Math.pow(10,digit-1) : otp
    return otp
}

module.exports = generateOtp