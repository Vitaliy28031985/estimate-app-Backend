const express = require('express');
const {add, remove, update} = require("../../controllers/advances");
const {auth} = require("../../middlewares")

const router = express.Router();

router.post('/:projectId', auth, add);
router.delete('/:projectId/:advancesId', auth, remove);
router.patch('/:projectId/:advancesId', auth, update);

module.exports = router;