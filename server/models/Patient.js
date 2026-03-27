const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    gender: String,
    contact: String,
    department: String,
    status: { type: String, default: 'Admitted' },
    dateJoined: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Patient', PatientSchema);