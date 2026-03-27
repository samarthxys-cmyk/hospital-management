const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    category: { type: String, required: true }, // e.g., Medicine, Equipment, Supplies
    quantity: { type: Number, required: true, default: 0 },
    unit: { type: String, default: 'Units' }, // e.g., Tablets, Bottles, Boxes
    expiryDate: { type: Date },
    supplier: String,
    status: { 
        type: String, 
        enum: ['In Stock', 'Low Stock', 'Out of Stock'], 
        default: 'In Stock' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', InventorySchema);