const ErrorHander = require("../utils/errorhandler");
const cathAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModels");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const { request } = require("express");
const crypto = require("crypto");
const cloudinary  = require("cloudinary");


// Register a User 
exports.registerUser = cathAsyncErrors(async (req,res,next)=>{
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder: "avatars",
        width: 150,
        crop: "scale",
    });
    const {name,email,password} = req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    });
    sendToken(user, 201, res);
});

// Login User

exports.loginUser = cathAsyncErrors (async(req,res,next)=>{
    const {email,password} = req.body;
    // checking if user given password and email both
    if(!email || !password){
        return next(new ErrorHander("Please Enter Email and Password",400));
    }
    const user = await User.findOne({ email }).select("+password");
    if(!user){
        return next(new ErrorHander("Invalid Email or Password",401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid Email or Password",401));
    }
    sendToken(user, 200, res);
});

// Logout User

exports.logout = cathAsyncErrors(async(req, res, next)=>{
    res.cookie("token", null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Logout Successful"
    });
});

// Forgot Password
exports.forgotPassword = cathAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({ email: req.body.email });

    if(!user){
        return next(new ErrorHander("User not found",404));
    }
    // Get resetPassword Token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave:false });
    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    const message = `Youe password reset token is :- \n\n ${ resetPasswordUrl } \n\nif you have not requested this email then, please ignore it.`;
    
    try{
        await sendEmail({
            email:user.email,
            subject: 'Every Day Market Password Recovery',
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully.Check Spam also`,
        });
    } catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        const user = await User.findOne({ email: req.body.email });
        return next(new ErrorHander(error.message,500));

    }
});

// Reset Password
exports.resetPassword = cathAsyncErrors(async(req,res,next)=>{
    // creating token hash
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });
    if(!user){
        return next(new ErrorHander("Reset Password Token is invalid or has been expired",404));
    };
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHander("Password does not match",400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user,200,res);
});

// Get User Detail
exports.getUserDetail = cathAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

// Update User Password
exports.updatePassword = cathAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldpassword);
    if(!isPasswordMatched){
        return next(new ErrorHander("Old Password is incorrect",400));
    }
    if(req.body.newpassword !== req.body.confirmPassword){
        return next(new ErrorHander("Password does not match",400));
    }
    user.password = req.body.newpassword;
    await user.save();

    sendToken(user, 200, res);
});

// Update User Profile
exports.updateProfile = cathAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
    };
    if(req.body.avatar !==""){
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder: "avatars",
            width: 150,
            crop: "scale",
        });
        newUserData.avatar ={
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }

    };
    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify:false,
    });
    res.status(200).json({
        success: true,
    });
    
});

// Get All User--Admin

exports.getAllUser = cathAsyncErrors(async(req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
        success: true,
        users,
    });
});

// Get Single User--Admin

exports.getSingleUser = cathAsyncErrors(async(req,res,next)=>{
    const user= await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHander(`User does not exist with Id: ${req.params.id}`));
    }
    res.status(200).json({
        success: true,
        user,
    });
});

// Update User Role--Admin
exports.updateUserRole = cathAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify:false,
    });
    if(!user){
        return next(new ErrorHander(`User does not exist with Id: ${req.params.id}`));
    }
    res.status(200).json({
        success: true,
    });
    
});

// Delete User--Admin
exports.deleteUser = cathAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHander(`User does not exist with Id: ${req.params.id}`));
    }
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    await user.remove();
    res.status(200).json({
        success: true,
        message:"User Delete Successfully",
    });
    
});