const express = require('express');
const router = express.Router();
const doctorController = require('../controller/doctorController');

// Using the dot notation is safer to avoid undefined errors
router.get('/', doctorController.getDoctors); 
router.post('/', doctorController.addDoctor);

module.exports = router;