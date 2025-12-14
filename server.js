const express = require('express');
const connectDB = require('./config/db');
const sweetRoutes = require('./routes/sweetRoutes'); // <--- 1. Import routes

const app = express();

connectDB();

app.use(express.json());

// 2. Use the routes. This creates the URL: http://localhost:5000/api/sweets
app.use('/api/sweets', sweetRoutes); // <--- 2. Add this line

app.get('/', (req, res) => {
    res.send('The Sweet Shop Server is working!');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});