const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type:String,
        required:true
    },
    items: [{
        itemName: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    trackingNumber: {
        type: String,
        default: null // Default tracking number to null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    deliveredAt:{
        type:Date
    }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
