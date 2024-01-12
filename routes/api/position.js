const express = require('express');

const {add, removePosition} = require("../../controllers/position")
const {auth} = require("../../middlewares")

const router = express.Router();


router.post('/:positionId/:projectId', auth, add);
router.delete('/:projectId/:estimateId/:positionId', auth, removePosition);

module.exports = router;