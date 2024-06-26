const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Pleace Enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Pleace Enter product description"]
    },
    price:{
        type:Number,
        required:[true,"Pleace Enter product price"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Pleace Enter product category"]
    },
    Stock:{
        type:Number,
        required:[true,"Pleace Enter product Stock"],
        mexLength:[4,"Stock can not exceed 4 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {   
            user:{
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required:true,
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Product",productSchema)