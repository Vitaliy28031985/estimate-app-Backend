const express = require('express');
const {add} = require("../../controllers/materials")
const {auth} = require("../../middlewares")

const router = express.Router();

router.post('/:projectId', auth, add);

module.exports = router;