const jwt = require('jsonwebtoken');
const User = require('../models/User');

// --- THE SECURITY GUARD: Protect ---
// This middleware checks if a user is logged in via the JWT cookie.
// If valid, it attaches the user details to the request object (req.user) and calls next().
const protect = async (req, res, next) => {
    let token;

    // 1. Check if the 'jwt' cookie exists
    if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        // If no token, redirect to the login page
        return res.redirect('/login?error=Please log in to continue.'); 
    }

    try {
        // 2. Verify the token using the secret key
        const decoded = jwt.verify(token, 'YOUR_SECRET_KEY');

        // 3. Find the user based on the ID in the token
        const user = await User.findById(decoded.userId).select('-password');
        
        if (user) {
            // 4. Attach user object to the request (req.user)
            req.user = user;
            next(); // Allow the request to proceed to the controller
        } else {
            // Token is valid but user ID not found
            return res.redirect('/login?error=User not found. Please log in again.');
        }
        
    } catch (error) {
        console.error('Not authorized, token failed', error);
        // If token fails validation, redirect to login
        return res.redirect('/login?error=Session expired. Please log in again.');
    }
};

// --- THE ADMIN CHECK: Admin ---
// This middleware runs AFTER 'protect' and ensures the user is an Admin.
const admin = (req, res, next) => {
    // We rely on req.user being populated by the 'protect' middleware
    if (req.user && req.user.isAdmin) {
        next(); // User is Admin, allow them to proceed
    } else {
        // Not Admin, deny access with a 401 response (for API calls)
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

module.exports = { protect, admin };