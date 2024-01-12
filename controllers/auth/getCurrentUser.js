const {User} = require("../../models/user");
const getCurrentUser = async (req, res) => {
    const { _id } = req.user; 
    console.log(_id)
    const user = await User.findById(_id);
    if (!user) {
        return res.status(401).json({
          status: 'error',
          code: 401,
          message: 'Not authorized',
        });
      }
      res.json({
        status: 'success',
        code: 200,
        user,
      });
}

module.exports = getCurrentUser;