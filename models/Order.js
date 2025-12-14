const mongoose = require('mongoose');

// The schema for individual items within the order
const orderItemSchema = mongoose.Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true }, // Quantity (how many kg/units)
    price: { type: Number, required: true }, // Price at the time of purchase
    sweet: {
        type: mongoose.Schema.Types.ObjectId, // Link to the actual Sweet document
        required: true,
        ref: 'Sweet',
    },
});

// The main Order schema (stores both pending carts and finalized orders)
const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    orderItems: [orderItemSchema],
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false, // False means it's still a pending cart
    },
    paidAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;