const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    doctorName: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    reason: String,
    status: { 
        type: String, 
        enum: ['Scheduled', 'Completed', 'Cancelled'], 
        default: 'Scheduled' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);