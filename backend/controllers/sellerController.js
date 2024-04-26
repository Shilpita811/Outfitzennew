const ErrorHander = require ("../utils/errorhandler");
const cathAsyncErrors = require("../middleware/catchAsyncError");
const Seller = require("../models/sellerModel");
const sendToken = require("../utils/jwtToken")

// Request 

exports.sellerRequest =cathAsyncErrors(async(req, res, next)=>{
    const seller = await Seller.create(req.body);
    res.status(201).json({
        success: true,
        seller,
    })
});

// Get All Request -- Admin

exports.getAllSellerRequest = cathAsyncErrors(async(req, res, next)=>{
    const sellers = await Seller.find();
    res.status(200).json({
        success: true,
        sellers,
    });
});

// Get Request Details
exports.getRequestDetails = cathAsyncErrors(async(req,res,next)=>{
    const request = await Seller.findById(req.request.id);
    res.status(200).json({
        success: true,
        request,
    });
});

// Get Singel Request--Admin
exports.getSingleRequest = cathAsyncErrors(async(req,res,next)=>{
    const request = await Seller.findById(req.params.id);
    if(!request){
        return next(new ErrorHander(`Request does not exist with Id: ${req.params.id}`));
    }
    res.status(200).json({
        success: true,
        request,
    });
});

// Delete Request -- admin

exports.deleteRequest = cathAsyncErrors(async(req, res, next)=>{
    const request = await Seller.findById(req.params.id);

    if(!request){
        return next(new ErrorHander("Request not found with this Id",404));
    };
    await request.remove();

    res.status(200).json({
        success: true,
    });
});

// Update Request--Admin

exports.updateRequest = cathAsyncErrors(async(req, res, next)=>{
    const newRequestData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    };
    const request = await Seller.findByIdAndUpdate(req.params.id, newRequestData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    if(!request){
        return next(new ErrorHander(`Request does not exist with Id: ${req.params.id}`));
    }
    res.status(200).json({
        success: true,
    });

})
