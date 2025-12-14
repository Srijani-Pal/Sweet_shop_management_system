const Sweet = require('../models/Sweet');

// 1. CREATE a new sweet
const createSweet = async (req, res) => {
    try {
        const { name, price, category, stock } = req.body;
        const sweet = await Sweet.create({ name, price, category, stock });
        res.status(201).json(sweet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 2. GET all sweets
const getSweets = async (req, res) => {
    try {
        const sweets = await Sweet.find({});
        res.json(sweets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. UPDATE a sweet (Change price or stock)
const updateSweet = async (req, res) => {
    try {
        // Find the sweet by the ID passed in the URL
        const sweet = await Sweet.findById(req.params.id);

        if (sweet) {
            // Update fields (or keep old value if nothing sent)
            sweet.name = req.body.name || sweet.name;
            sweet.price = req.body.price || sweet.price;
            sweet.stock = req.body.stock || sweet.stock;
            sweet.category = req.body.category || sweet.category;

            const updatedSweet = await sweet.save();
            res.json(updatedSweet);
        } else {
            res.status(404).json({ message: 'Sweet not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 4. DELETE a sweet
const deleteSweet = async (req, res) => {
    try {
        const sweet = await Sweet.findByIdAndDelete(req.params.id);
        
        if (sweet) {
            res.json({ message: 'Sweet removed successfully' });
        } else {
            res.status(404).json({ message: 'Sweet not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createSweet, getSweets, updateSweet, deleteSweet };