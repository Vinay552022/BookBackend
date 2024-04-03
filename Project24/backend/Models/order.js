const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:true
    },
    items: [{
        bookId: {
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
    },
    placedBy:{
        type:String,
        default:this.email
    }
});

const order = mongoose.model('order', orderSchema);

module.exports = order;
