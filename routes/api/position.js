const express = require('express');

const {add, removePosition, update} = require("../../controllers/position")
const {auth} = require("../../middlewares")

const router = express.Router();


router.post('/:positionId/:projectId', auth, add);
router.patch('/:projectId/:estimateId/:positionId', auth, update)
router.delete('/:projectId/:estimateId/:positionId', auth, removePosition);

module.exports = router;