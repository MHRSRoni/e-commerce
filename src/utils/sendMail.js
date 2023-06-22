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
      console.log(transporter)
    transporter.sendMail(mail,(error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }})
}

module.exports = sendMail

