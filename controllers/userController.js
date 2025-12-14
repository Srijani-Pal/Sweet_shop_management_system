const User = require('../models/User');
const jwt = require('jsonwebtoken');

// 1. Generate JWT Token (The Digital ID Card)
const generateToken = (res, userId) => {
    // We create a token that contains the user's ID
    const token = jwt.sign({ userId }, 'YOUR_SECRET_KEY', {
        expiresIn: '30d', // Token expires in 30 days
    });

    // Send the token back to the browser in a secure cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        sameSite: 'strict', // Helps prevent CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
};

// 2. Register a New User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        // If they exist, redirect them back
        return res.redirect('/register?error=User already exists');
    }

    // Create the new user. The password is automatically encrypted by the model.
    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        // Give them a digital ID card (token) and redirect to the home page
        generateToken(res, user._id);
        res.redirect('/');
    } else {
        res.redirect('/register?error=Invalid user data');
    }
};

// 3. Authenticate/Log In a User
const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        // If login successful, issue the digital ID card (token)
        generateToken(res, user._id);
        res.redirect('/'); // Go to the Sweet Shop menu
    } else {
        res.redirect('/login?error=Invalid email or password');
    }
};

// 4. Log Out User
const logoutUser = (req, res) => {
    // Clear the cookie to log them out
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.redirect('/');
};

module.exports = { registerUser, authUser, logoutUser };