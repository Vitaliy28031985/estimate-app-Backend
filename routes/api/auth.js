const express = require('express');
const { register, login, logout, getCurrentUser, addProject, deleteProject, getAll } = require("../../controllers/auth");
const {auth} = require("../../middlewares")

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post('/logout', auth, logout);
router.get('/current', auth, getCurrentUser);
router.get('/', auth, getAll);
router.patch('/:projectId', auth, addProject);
router.patch('/delete/:projectId', auth, deleteProject);

module.exports = router;
