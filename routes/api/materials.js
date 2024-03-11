const express = require('express');
const {add, remove, update} = require("../../controllers/materials")
const {auth} = require("../../middlewares")

const router = express.Router();

router.post('/:projectId', auth, add);
router.delete('/:projectId/:materialsId', auth, remove);
router.patch('/:projectId/:materialsId', auth, update);

module.exports = router;