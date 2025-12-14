const express = require('express');
const router = express.Router();
const {
    getSweets,
    createSweet,
    updateSweet, // NEW
    deleteSweet // NEW
} = require('../controllers/sweetController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getSweets) // Everyone can read (GET)
    .post(protect, admin, createSweet); // Only Admin can create (POST)

router.route('/:id') // Routes that target a specific sweet by its ID
    .put(protect, admin, updateSweet) // Only Admin can update (PUT)
    .delete(protect, admin, deleteSweet); // Only Admin can delete (DELETE)

module.exports = router;