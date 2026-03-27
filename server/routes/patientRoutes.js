const express = require('express');
const router = express.Router();

const { addPatient, getPatients, deletePatient } = require('../controller/patientController');



router.post('/', addPatient);
router.get('/', getPatients);
router.delete('/:id', deletePatient); // Add this line

module.exports = router;