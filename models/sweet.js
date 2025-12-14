const mongoose = require('mongoose');

// This is the Blueprint (Schema)
const sweetSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true, // We MUST have a name
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        category: {
            type: String, // e.g. "Dry Sweet", "Syrup Sweet"
            required: true,
        },
        stock: {
            type: Number, // How many kg/pieces we have
            required: true,
            default: 0,
        }
    },
    {
        timestamps: true, // Automatically adds 'Created At' time
    }
);

const Sweet = mongoose.model('Sweet', sweetSchema);

module.exports = Sweet;