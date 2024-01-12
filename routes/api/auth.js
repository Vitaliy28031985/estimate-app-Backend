const express = require('express');
const { register, login, logout, getCurrentUser } = require("../../controllers/auth");
const {auth} = require("../../middlewares")

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post('/logout', auth, logout);
router.get('/current', auth, getCurrentUser);

module.exports = router;
