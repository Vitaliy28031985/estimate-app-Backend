const { Units } = require("../../models/price");
const {User} = require("../../models/user");

const update = async (req, res) => {
    
    const { _id } = req.user;
    const user = await User.findById(_id);
  
    if(user.role === "customer") {
      return res.status(403).json({ message: "У вас не має прав для здійснення операції" });
    }

    const { id } = req.params;
    const {body} = req;

    try {
        const updateUnit = await Units.findByIdAndUpdate({owner: _id,  _id: id }, body, {new: true, fields: ['-createdAt', '-updatedAt']});
        res.status(200).json(updateUnit);
    } catch (error) {
        console.error('Error update price:', error);
        res.status(404).json({ message: 'Not found' });
    }
}

module.exports = update;