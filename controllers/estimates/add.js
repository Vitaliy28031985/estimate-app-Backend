const { Projects } = require('../../models/estimate');
const {User} = require("../../models/user");

const add = async (req, res) => {

    const { _id } = req.user;
    const user = await User.findById(_id);
  
    if(user.role === "customer") {
      return res.status(403).json({ message: "У вас не має прав для здійснення операції" });
    }


    try { 
    const { estimates } = req.body;
    const { projectId } = req.params

            
    const estimatesNew = {
        title: estimates.title,
    }
    
   
    const updateProject = await Projects.findByIdAndUpdate(projectId, { $push: { estimates: estimatesNew } }, { new: true });    
        res.status(201).json(updateProject);

    } catch (error) {
    console.error('Error adding positions:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        
  }

        
}

module.exports = add