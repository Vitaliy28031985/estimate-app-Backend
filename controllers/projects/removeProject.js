const { Projects } = require("../../models/estimate");
const {User} = require("../../models/user");

const removeProject = async (req, res) => {
    
    const { _id } = req.user;
    const user = await User.findById(_id);
  
    if(user.role === "customer") {
      return res.status(403).json({ message: "У вас не має прав для здійснення операції" });
    }
  

    const {projectId} = req.params; 


    try {
        const removeProject = await Projects.findOneAndDelete({owner: _id, _id: projectId });
        res.status(200).json(removeProject);
       } catch (error) {
        console.error('Error adding positions:', error);
        res.status(404).json({ message: 'Not found' });
       }
}

module.exports = removeProject;