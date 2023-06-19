//dependencies
const ProductModel = require("../models/productModel")

//all products
exports.getAllProduct = async (req, res, next)=>{
    const product = await ProductModel.find({},{_id : 0, name : 1, price : 1, description : 1 , rating : 1})
    res.json(product)
}

exports.getAllProductVendor = async (req, res, next) =>{
    const {_id : vendorId} = req.user
    const products = await ProductModel.find({vendorId : vendorId})
    res.json(products)
  }

//create products
exports.createProduct = async (req, res, next)=>{
    const {catagory = "", name = "", price = null, description = "",quantity = null } = req.validData
    const vendorId = req.user._id
    const available = quantity

    const product = new ProductModel({
        catagory,
        name,
        price,
        description,
        quantity,
        available,
        vendorId,
        rating : 0,
    })
    await product.save()
    .then(data=>{ 
        const {type, name, price, description,quantity, createdAt} = data  //destructring data for info
        const resData = {type, name, price, description, quantity, createdAt}   //creating resData
        res.json({status : "created successfully", data : resData})
    })
    .catch(err=>next({code : 400, msg : err}))
    
}

//
exports.getProductByCatagory = async (req, res, next)=>{
    const catagory = req.params.catagory 
    const products = await ProductModel.find({catagory},{_id : 0, name : 1, price : 1, description:1, rating : 1,})
    res.json(products)
}