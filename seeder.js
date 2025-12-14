const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Sweet = require('./models/Sweet');

// 1. Connect to the Database
connectDB();

// 2. The List of Sweets to Add
const sweetsList = [
    {
        name: "Kaju Katli",
        price: 800,
        category: "Dry Sweet",
        stock: 50
    },
    {
        name: "Jalebi",
        price: 200,
        category: "Syrup Sweet",
        stock: 20
    },
    {
        name: "Motichoor Laddu",
        price: 300,
        category: "Laddu",
        stock: 100
    },
    {
        name: "Rasmalai",
        price: 450,
        category: "Bengali",
        stock: 30
    },
    {
        name: "Mysore Pak",
        price: 500,
        category: "Ghee Sweet",
        stock: 40
    },
    {
        name: "Soan Papdi",
        price: 250,
        category: "Dry Sweet",
        stock: 150
    },
    {
        name: "Kalakand",
        price: 400,
        category: "Milk Sweet",
        stock: 25
    },
    {
        name: "Gulab Jamun",
        price: 220,
        category: "Syrup Sweet",
        stock: 60
    },
    {
        name: "Peda",
        price: 350,
        category: "Milk Sweet",
        stock: 80
    },
    {
        name: "Gajar Ka Halwa",
        price: 400,
        category: "Halwa",
        stock: 15
    }
];

// 3. Function to Insert Data
const importData = async () => {
    try {
        // Optional: Delete existing sweets so we don't have duplicates
        // await Sweet.deleteMany(); 
        
        // Insert all sweets at once
        await Sweet.insertMany(sweetsList);

        console.log('✅ Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

importData();