//security dependencies importing
const xss = require("xss")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const mongoSanitize = require("express-mongo-sanitize")


//security dependencies configuring
const limiter = rateLimit({ windowMs : 15*60*100,   max: 100})  //rate limit

//creating security middleware
const securityConfig = [xss(),  helmet(),   limiter,   mongoSanitize() ]

//exporting security middleware

module.exports = securityConfig