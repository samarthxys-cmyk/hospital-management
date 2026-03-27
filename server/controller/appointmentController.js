const Appointment = require('../models/appoiment');

// Get all appointments
exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ date: 1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create new appointment
exports.addAppointment = async (req, res) => {
    try {
        const newAppt = new Appointment(req.body);
        const savedAppt = await newAppt.save();
        res.status(201).json(savedAppt);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete appointment
exports.deleteAppointment = async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: "Appointment cancelled" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};