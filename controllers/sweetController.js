const Sweet = require('../models/Sweet');

// @desc    Get all sweets
// @route   GET /api/sweets
// @access  Public
const getSweets = async (req, res) => {
    try {
        const sweets = await Sweet.find({});
        res.status(200).json(sweets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a sweet
// @route   POST /api/sweets
// @access  Private/Admin
const createSweet = async (req, res) => {
    try {
        const { name, category, price, stock } = req.body;

        const sweet = await Sweet.create({
            name,
            category,
            price,
            stock
        });

        res.status(201).json(sweet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a sweet (NEW)
// @route   PUT /api/sweets/:id
// @access  Private/Admin
const updateSweet = async (req, res) => {
    const { name, category, price, stock } = req.body;

    const sweet = await Sweet.findById(req.params.id);

    if (sweet) {
        sweet.name = name || sweet.name;
        sweet.category = category || sweet.category;
        sweet.price = price || sweet.price;
        sweet.stock = stock || sweet.stock;

        const updatedSweet = await sweet.save();
        res.json(updatedSweet);
    } else {
        res.status(404).json({ message: 'Sweet not found' });
    }
};

// @desc    Delete a sweet (NEW)
// @route   DELETE /api/sweets/:id
// @access  Private/Admin
const deleteSweet = async (req, res) => {
    const sweet = await Sweet.findById(req.params.id);

    if (sweet) {
        await Sweet.deleteOne({ _id: sweet._id });
        res.json({ message: 'Sweet removed' });
    } else {
        res.status(404).json({ message: 'Sweet not found' });
    }
};

module.exports = {
    getSweets,
    createSweet,
    updateSweet,
    deleteSweet
};