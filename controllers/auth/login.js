const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
require("dotenv").config();
const {User} = require("../../models/user");


const {SECRET_KEY} = process.env;

const login = async (req, res) => {
const {email, password} = req.body;
const user = await User.findOne({email});


if(!user) {
    return res.status(401).json({ message: 'Email or password is wrong' }); 
}

const passwordCompare = await bcrypt.compare(password, user.password);
if(!passwordCompare) {
    return res.status(401).json({ message: 'Email or password is wrong' }); 
}
const payload = {
    id: user._id,
}
const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
await User.findByIdAndUpdate(user._id, { $set: { token } });
res.status(201).json({
token
})
}
module.exports = login;