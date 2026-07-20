const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        price: { type: Number, required: true, min: [0, 'Price must be positive'] },
        category: { type: String, enum: ["Burger", "Pizza", "Snacks", "Drinks", "Other"], default: "Other" },
        image: { type: String, default: "" },
        description: { type: String, default: "" },
        isAvailable: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Food', foodSchema);