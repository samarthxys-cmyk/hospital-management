const express = require('express');
const router = express.Router();
const { getItems, addItem, updateStock } = require('../controller/inventoryController');

router.get('/', getItems);
router.post('/', addItem);
router.put('/:id', updateStock);

module.exports = router;