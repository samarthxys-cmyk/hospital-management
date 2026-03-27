const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true }, // Ensure this is not "spec"
    email: { type: String, required: true },
   
    phone: { type: String, required: true },
    status: { type: String, default: 'Available' },
    workingHours: { type: String },
    workingDate: { type: String }
    // Remove experience or fees if you aren't sending them from the React form!
}, { timestamps: true });

module.exports = mongoose.model('Doctor', DoctorSchema);