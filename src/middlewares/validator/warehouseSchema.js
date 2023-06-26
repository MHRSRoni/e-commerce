const joi = require("joi");
const { name, address, id } = require("./validatingSchema");

exports.warehouse = joi.object({
    name : name,
    address : address
})

exports.shipment = joi.array().items(id)