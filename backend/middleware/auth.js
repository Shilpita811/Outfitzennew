const ErrorHander = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
    const { token } = req.cookies;
    
    if(!token){
        return next(new ErrorHander("Pleace Login to access this resource",401));
    }
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodeData.id);
    next();
});

exports.authorizeRoles = (...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHander(`Role: ${req.user.role} is not allowed to access this resouce`,403
            ));
        }
        next();
    }
}