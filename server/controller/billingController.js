const Billing = require('../models/Billing');

// Get all bills
exports.getBills = async (req, res) => {
    try {
        const bills = await Billing.find().sort({ createdAt: -1 });
        res.json(bills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create new invoice
exports.createBill = async (req, res) => {
    try {
        const newBill = new Billing(req.body);
        const savedBill = await newBill.save();
        res.status(201).json(savedBill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update payment status (Mark as Paid)
exports.updateStatus = async (req, res) => {
    try {
        const updatedBill = await Billing.findByIdAndUpdate(
            req.params.id, 
            { status: 'Paid' }, 
            { new: true }
        );
        res.json(updatedBill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};