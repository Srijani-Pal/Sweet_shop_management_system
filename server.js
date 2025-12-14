const express = require('express');
const connectDB = require('./config/db');
const sweetRoutes = require('./routes/sweetRoutes');
const userRoutes = require('./routes/userRoutes'); 
const orderRoutes = require('./routes/orderRoutes'); 
const { protect } = require('./middleware/authMiddleware'); 
const Sweet = require('./models/Sweet');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken'); // Needed for manual check in the '/' route

const app = express();

// Connect to the Database
connectDB();

// Setup the View Engine (EJS for the website frontend)
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Allows reading form data
app.use(cookieParser()); // Allows reading and setting secure cookies

// === API ROUTES (Backend Logic) ===
app.use('/api/sweets', sweetRoutes); // For CRUD operations on sweets (Admin-only access protected within routes)
app.use('/api/orders', orderRoutes); // For Cart and Order operations (requires login)

// === VIEW ROUTES (Website Pages) ===
app.use('/', userRoutes); // For Register, Login, and Logout POST actions

// Route to show the Registration page
app.get('/register', (req, res) => {
    const error = req.query.error; 
    res.render('register', { error });
});

// Route to show the Login page
app.get('/login', (req, res) => {
    const error = req.query.error;
    res.render('login', { error });
});

// Route to show the Cart page (Requires login)
app.get('/cart', protect, (req, res) => {
    // The 'protect' middleware ensures the user is logged in before rendering the cart view.
    res.render('cart');
});

// Route for the Sweet Shop Menu/Homepage
app.get('/', async (req, res) => {
    let loggedInUser = null;
    try {
        // Manual check of the JWT cookie to get user status without forcing a redirect (for guests).
        const token = req.cookies.jwt;
        if (token) {
            // NOTE: The secret key must match the one in userController.js and authMiddleware.js
            const decoded = jwt.verify(token, 'YOUR_SECRET_KEY');
            // Using require() here to access the model without breaking module exports
            const User = require('./models/User'); 
            loggedInUser = await User.findById(decoded.userId).select('-password');
        }
    } catch (error) {
        // Ignore token errors, simply treat them as a guest user
        loggedInUser = null;
    }

    try {
        // Get all sweets from the database
        const allSweets = await Sweet.find({});
        
        // Render the index page, passing the sweets data AND the user details
        res.render('index', { 
            sweets: allSweets,
            user: loggedInUser 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error displaying menu.");
    }
});


// === Start Server ===
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});