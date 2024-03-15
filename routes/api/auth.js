const express = require('express');
const { register, login, logout, getCurrentUser, addProject  } = require("../../controllers/auth");
const {auth} = require("../../middlewares")

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post('/logout', auth, logout);
router.get('/current', auth, getCurrentUser);
router.patch('/:projectId', auth, addProject);

module.exports = router;
