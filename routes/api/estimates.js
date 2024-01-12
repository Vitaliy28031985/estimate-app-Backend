const express = require('express');
const {getAll, getEstimatesById, add, removeEstimate} = require("../../controllers/estimates")
const {auth} = require("../../middlewares")

const router = express.Router();

router.get('/', auth, getAll);
router.get('/:estimatesId', auth, getEstimatesById);
router.post('/:projectId', auth, add);
router.delete('/:projectId/:estimateId', auth, removeEstimate)

module.exports = router;