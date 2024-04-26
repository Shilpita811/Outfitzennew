const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhandler");
const cathAsyncErrors = require("../middleware/catchAsyncError");

// Create new order

exports.newOrder = cathAsyncErrors(async(req,res,next)=>{
    const {
        shippingInfo, 
        orderItems, 
        paymentInfo, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice
    } = req.body; 
    const order = await Order.create({
        shippingInfo, 
        orderItems, 
        paymentInfo, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });
    res.status(200).json({
        success: true,
        order,
    });
});

// Get single order

exports.getSingleOrder = cathAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user","name email");

    if(!order){
        return next(new ErrorHander("Order not found with this Id", 404));
    };
    res.status(200).json({
        success: true,
        order,
    });
});

// Get logged in user orders

exports.myOrder = cathAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders,
    });
});

// Get All orders--Admin

exports.getAllOrder = cathAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});

// Update order status--Admin

exports.updateOrder = cathAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHander("Order not found with this Id", 404));
    };

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHander("Order already delivered", 400));
    }

    if (req.body.status === "Shipped"){
        order.orderItems.forEach(async (o)=>{
            await updateStock(o.product,o.quantity);
        });
    };

    order.orderStatus = req.body.status;

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

async function updateStock(id,quantity){
    const product = await Product.findById(id);
    product.Stock-=quantity;
    await product.save({ validateBeforeSave: false });
};

// delete order--Admin

exports.deleteOrder = cathAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHander("Order not found with this Id", 404));
    };

    await order.remove();

    res.status(200).json({
        success: true,
    });
});
