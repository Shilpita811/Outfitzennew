const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const requestSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Seller Name"],
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique: true,
        validator:[validator.isEmail, "Please Enter Valid Email"]
    },
    phoneNo:{
        type:Number,
        required:[true,"Please Enter Your Phone No."],
    },
    address:{
        type: String, 
        required: true
    },
    pinCode:{
        type: Number, 
        required: true, 
    },
    password:{
        type:String,
        required:[true,"Pleace Enter Your Password"],
        minLength:[8,"Password should be greater than 8 characters"],
        select: false,
    },
    role:{
        type:String,
        default:'Pending'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

// password hashing
requestSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

// JWT token
requestSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    })
};

// Compare Password
requestSchema.methods.comparePassword = async function(enteredPassword){
    return bcrypt.compare(enteredPassword,this.password);
};

// Generating Password Reset Token 

requestSchema.methods.getResetPasswordToken = function() {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
    // Hashing and adding resetPasswordToken  to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 *1000;
    return resetToken;
};


module.exports = mongoose.model("Request",requestSchema);