const express = require('express');
const router = express.Router();
const { 
    createSweet, 
    getSweets, 
    updateSweet, 
    deleteSweet 
} = require('../controllers/sweetController');

// URL: http://localhost:5000/api/sweets
router.route('/').post(createSweet).get(getSweets);

// URL: http://localhost:5000/api/sweets/:id 
// (The :id is where you put the long ID number)
router.route('/:id').put(updateSweet).delete(deleteSweet);

module.exports = router;