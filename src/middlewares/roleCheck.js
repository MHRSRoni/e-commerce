exports.isAdmin = (req, res, next) =>{
    if(req.user.role === "admin"){
        next()
        return null
    }
    else{
        next({code : 400, msg : "unauthorized"})
        return null
    }
}


exports.isVendor = (req, res, next) => {
    if(req.user.role === "vendor"){
        next()
        return null
    }
    else{
        next({code : 400, msg : "unauthorized"})
        return null
    }
}


exports.isShipper = (req, res, next) => {
    if(req.user.role === "shipper"){
        next()
        return null
    }
    else{
        next({code : 400, msg : "unauthorized"})
        return null
    }
}


exports.isCustomerCare = (req, res, next) => {
    if(req.user.role === "customer_care"){
        next()
        return null
    }
    else{
        next({code : 400, msg : "unauthorized"})
        return null
    }
}


exports.isWarehouseManager = (req, res, next) => {
    if(req.user.role === "warehouse_manager"){
        next()
        return null
    }
    else{
        next({code : 400, msg : "unauthorized"})
        return null
    }
}


exports.isAccountant = (req, res, next) => {
    if(req.user.role === "accountant"){
        next()
        return null
    }
    else{
        next({code : 400, msg : "unauthorized"})
        return null
    }
}


exports.isCustomer = (req, res, next) => {
    if(req.user.role === "customer"){
        next()
        return null
    }
    else{
        next({code : 400, msg : "unauthorized"})
        return null
    }
}