const OrderModel = require("../models/orderModel");
const ProductModel = require("../models/productModel");
const UserModel = require("../models/userModel");

exports.createOrder = async (req, res, next) =>{
    const deleviryDelay = 7*24*60*60*1000
    const currentDate = new Date()
    const estimatedDelevary = new Date(currentDate.getTime() + deleviryDelay)
    const {products : productArray} = req.body
    let totalAmmount = null

    let vendors  = []
    const products = []
    for(const productId of productArray){
      const product = await ProductModel.findById(productId)
      if(!vendors.includes(product.vendorId.toString())){vendors.push(product.vendorId.toString())}
      products.push(product)
    }
    vendors = vendors.map(el => {return {vendorId : el}})
    vendors = vendors.map(vendor=>{
      const productIds = []
      let ammount = null
      for(const product of products){
        if(vendor.vendorId.toString() === product.vendorId.toString()){
          productIds.push(product._id)
          ammount += product.price
          totalAmmount += product.price
        }
      }
      return {
        vendorId : vendor.vendorId,
        productIds : productIds,
        ammount : ammount,
      }
    })
    const user = await UserModel.findOne({_id : req.user._id})
    if(!user.address){user.address = "working on it"}
    const order =  OrderModel({
      customerId : req.user._id,
      products : vendors,
      totalAmmount,
      estimatedDelevary,
      address : user.address
    })
    await order.save()
    res.json(order)
}




exports.getAllOrderForVendor = async (req, res, next) =>{
  const {_id : vendorId} = req.user
  const orders = await OrderModel.find({"products.vendorId" : vendorId},{
    _id : 1,
    customerId : 1,
    status : 1,
    "products.productIds" : 1,
    address : 1,
    estimatedDelevary : 1
  })

  res.json(orders)
}

exports.getOrderByStatus = async (req, res, next) =>{
  const {_id : vendorId} = req.user
  const status = req.params.status 
  console.log(status)

  const orders = await OrderModel.find({"products.vendorId" : vendorId,status : status},{
    _id : 1,
    customerId : 1,
    status : 1,
    "products.productIds" : 1,
    address : 1,
    estimatedDelevary : 1
  })

  res.json(orders)
}