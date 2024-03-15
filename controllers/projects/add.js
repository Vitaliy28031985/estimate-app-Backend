const { Projects } = require("../../models/estimate");
const {User} = require("../../models/user");

const add = async (req, res) => {
    
    const { _id } = req.user;
    const user = await User.findById(_id);
  
    if(user.role === "customer") {
      return res.status(403).json({ message: "У вас не має прав для здійснення операції" });
    }

    const { body } = req;
    const result = await Projects.create({...body, owner: _id});
    res.status(201).json(result);
}

module.exports = add