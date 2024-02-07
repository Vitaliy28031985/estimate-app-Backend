const express = require('express');
const { add, getAll, removeProject, getProjectById, update} = require("../../controllers/projects");
const {auth} = require("../../middlewares")

const router = express.Router();

router.get('/', auth, getAll);
router.get('/:projectId', auth, getProjectById);
router.post('/', auth, add);
router.patch('/:projectId', auth, update);
router.delete('/:projectId', auth, removeProject)

module.exports = router;