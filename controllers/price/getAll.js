const { Price } = require("../../models/price");
const {User} = require("../../models/user");

const getAll = async (req, res) => {
    
    const { _id } = req.user;
  const user = await User.findById(_id);

  if(user.role === "customer") {
    return res.status(403).json({ message: "У вас не має прав для здійснення операції" });
  }

    const result = await Price.find({ owner: _id });
    res.json(result);
}

module.exports = getAll