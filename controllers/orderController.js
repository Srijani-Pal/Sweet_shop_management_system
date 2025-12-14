const Order = require('../models/Order');
const Sweet = require('../models/Sweet');

// Helper function to get the user's current pending cart
const getOrCreateCart = async (userId) => {
    // A 'cart' is just an unpaid order
    let cart = await Order.findOne({ user: userId, isPaid: false });
    
    if (!cart) {
        // Create a new cart if one doesn't exist
        cart = new Order({ user: userId, orderItems: [] });
    }
    return cart;
};


// @desc    Add a sweet to the cart
// @route   POST /api/orders/cart/add
// @access  Private
const addToCart = async (req, res) => {
    const { sweetId, qty } = req.body;
    const userId = req.user._id; // User ID is attached by the 'protect' middleware

    const sweet = await Sweet.findById(sweetId);

    if (sweet && sweet.stock >= qty) {
        const cart = await getOrCreateCart(userId);
        
        // Check if the item is already in the cart
        const itemIndex = cart.orderItems.findIndex(item => item.sweet.toString() === sweetId);

        if (itemIndex > -1) {
            // Item exists, update quantity
            cart.orderItems[itemIndex].qty += Number(qty);
        } else {
            // Item does not exist, add new item
            const item = {
                name: sweet.name,
                qty: Number(qty),
                price: sweet.price,
                sweet: sweet._id,
            };
            cart.orderItems.push(item);
        }

        // Recalculate total price
        cart.totalPrice = cart.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);

        await cart.save();
        res.status(200).json({ message: 'Item added to cart', cart });

    } else if (sweet && sweet.stock < qty) {
        res.status(400).json({ message: 'Insufficient stock available.' });
    } else {
        res.status(404).json({ message: 'Sweet not found.' });
    }
};


// @desc    Get the user's cart items
// @route   GET /api/orders/cart
// @access  Private
const getCart = async (req, res) => {
    const userId = req.user._id;
    const cart = await getOrCreateCart(userId);
    res.status(200).json(cart);
};


// @desc    Finalize the purchase (Place Order)
// @route   POST /api/orders/placeorder
// @access  Private
const placeOrder = async (req, res) => {
    const userId = req.user._id;
    const cart = await getOrCreateCart(userId);

    if (cart.orderItems.length === 0) {
        return res.status(400).json({ message: 'Your cart is empty.' });
    }

    // 1. Mark the cart as paid (it becomes a finalized Order)
    cart.isPaid = true;
    cart.paidAt = Date.now();
    await cart.save();

    // 2. Update stock for each item
    for (const item of cart.orderItems) {
        const sweet = await Sweet.findById(item.sweet);
        if (sweet) {
            sweet.stock -= item.qty;
            await sweet.save();
        }
    }

    res.status(201).json({ message: 'Order placed successfully!', order: cart });
};


module.exports = {
    addToCart,
    getCart,
    placeOrder,
};