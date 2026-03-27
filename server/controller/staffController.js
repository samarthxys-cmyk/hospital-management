const Staff = require('../models/Staff');

exports.addStaff = async (req, res) => {
    try {
        const newStaff = new Staff(req.body);
        const savedStaff = await newStaff.save();
        res.status(201).json(savedStaff);
    } catch (err) {
        // This log will appear in your VS Code terminal and tell you EXACTLY what is missing
        console.error("Mongoose Validation Error:", err.message);
        res.status(400).json({ message: err.message });
    }
};

exports.getStaff = async (req, res) => {
    try {
        const staff = await Staff.find().sort({ createdAt: -1 });
        res.json(staff);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};