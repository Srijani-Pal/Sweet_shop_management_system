const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // This connects to a local database named 'sweetshop'
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/sweetshop');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;