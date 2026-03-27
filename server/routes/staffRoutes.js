const express = require('express');
const router = express.Router();
const staffController = require('../controller/staffController');

// Using the dot notation ensures the functions are loaded correctly
router.get('/', staffController.getStaff);
router.post('/', staffController.addStaff);

module.exports = router;