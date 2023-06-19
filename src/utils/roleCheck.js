module.exports = (allowedRole) =>{//array of allowed role
    return (req, res, next) => {
        if(allowedRole.includes(req.user.role)){
            next()
        }
        else{
            next({code: 400, msg: "unauthorized"})
        }
    }
}