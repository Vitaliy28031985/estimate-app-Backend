const express = require('express');
const {auth} = require("../../middlewares");
const {getAll, add, update, remove} = require("../../controllers/units");

const router = express.Router();

router.get('/', auth, getAll);
router.post('/', auth, add);
router.delete('/:id', auth, remove);
router.put('/:id', auth, update);

module.exports = router;