const Inventory = require('../models/Inventory');

// Get all inventory items
exports.getItems = async (req, res) => {
    try {
        const items = await Inventory.find().sort({ itemName: 1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add new item to stock
exports.addItem = async (req, res) => {
    try {
        const newItem = new Inventory(req.body);
        // Auto-update status based on quantity
        if (newItem.quantity === 0) newItem.status = 'Out of Stock';
        else if (newItem.quantity < 10) newItem.status = 'Low Stock';

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update stock quantity
exports.updateStock = async (req, res) => {
    try {
        const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};