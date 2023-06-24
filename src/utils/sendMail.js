const nodemailer = require("nodemailer")
require("dotenv").config()

const sendMail = (mail) =>{
    const transporter = nodemailer.createTransport({
        host : "smtp.gmail.com",
        port : 587,
        secure : false,
        auth : {
            user : process.env.email,
            pass : process.env.password
        }
      })
    transporter.sendMail(mail,(error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return false
        } else {
          console.log('Email sent:', info.response);
          return true
        }})
}

module.exports = sendMail

