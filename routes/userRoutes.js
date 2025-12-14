const express = require('express');
const router = express.Router();
const { registerUser, authUser, logoutUser } = require('../controllers/userController');

// Handles POST request from the Register form
router.post('/register', registerUser);

// Handles POST request from the Login form
router.post('/login', authUser);

// Handles POST request for Logout
router.post('/logout', logoutUser);

module.exports = router;