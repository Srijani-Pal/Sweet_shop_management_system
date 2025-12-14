const express = require('express');
const router = express.Router();
const {
    addToCart,
    getCart,
    placeOrder,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// All these actions require a logged-in user (Customer or Admin)
router.route('/cart').get(protect, getCart); // View cart
router.route('/cart/add').post(protect, addToCart); // Add item to cart
router.route('/placeorder').post(protect, placeOrder); // Finalize order

module.exports = router;