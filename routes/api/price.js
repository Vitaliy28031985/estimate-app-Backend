const express = require('express');
const {add, remove, getAll} = require("../../controllers/price")
const {auth} = require("../../middlewares")

const router = express.Router();
router.get('/', auth, getAll);
router.post('/', auth, add);
router.delete('/:priceId', auth, remove);

module.exports = router;