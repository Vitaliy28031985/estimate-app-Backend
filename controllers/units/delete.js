const { Units } = require("../../models/price");
const {User} = require("../../models/user");

const remove = async (req, res) => {
   
    const { _id } = req.user;
  const user = await User.findById(_id);

  if(user.role === "customer") {
    return res.status(403).json({ message: "У вас не має прав для здійснення операції" });
  }

    const { id } = req.params;


    try {
        const removePrice = await Units.findOneAndDelete({owner: _id,  _id: id });
        res.status(200).json(removePrice);
    } catch (error) {
        console.error('Error removing units:', error);
        res.status(404).json({ message: 'Not found' });
    }
}

module.exports = remove;
