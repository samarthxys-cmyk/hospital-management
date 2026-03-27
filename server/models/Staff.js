const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    dept: { type: String, required: true }, // Ensure this matches 'dept' in React
    shift: { type: String, required: true },
    phone: { type: String, required: true }
    // If you have 'email' here, make sure it's NOT required or add it to the form
}, { timestamps: true });

module.exports = mongoose.model('Staff', StaffSchema);