const Patient = require('../models/Patient');

// @desc    Add a new patient
// @route   POST /api/patients
exports.addPatient = async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        const savedPatient = await newPatient.save();
        res.status(201).json(savedPatient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get all patients
// @route   GET /api/patients
exports.getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Delete a patient
// @route   DELETE /api/patients/:id
exports.deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) return res.status(404).json({ message: "Patient not found" });
        res.status(200).json({ message: "Patient removed" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};