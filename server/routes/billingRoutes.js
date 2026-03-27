const express = require('express');
const router = express.Router();
const { getBills, createBill, updateStatus } = require('../controller/billingController');

router.get('/', getBills);
router.post('/', createBill);
router.put('/:id', updateStatus);

module.exports = router;