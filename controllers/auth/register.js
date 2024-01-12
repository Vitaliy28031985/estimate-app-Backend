const bcrypt = require("bcryptjs");
const {User} = require("../../models/user");

const register = async(req, res) => {
    const {email, password} = req.body;
    
    const user = await User.findOne({email});
   

    if(user) {
        return res.status(409).json({ message: 'Email in use' }); 
    }
   const hashPassword = await bcrypt.hash(password, 10);

const newUser = await User.create({...req.body, password: hashPassword});

res.status(201).json({
    email: newUser.email,
    name: newUser.name
})
}

module.exports = register;