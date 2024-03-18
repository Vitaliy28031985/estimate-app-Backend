const {User} = require("../../models/user");

const getAll = async (req, res) => {

    try {
     const result = await User.find();
     res.json(result);
    }catch (error) {
        console.error('Error get users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
       }
   
}

module.exports = getAll;