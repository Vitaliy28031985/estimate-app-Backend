// const { Projects } = require("../../models/estimate");
const {User} = require("../../models/user");

const addProject = async (req, res) => {
   
    const {projectId} = req.params; 
    const emailCurrent = req.body;
     
    const user = await User.find();
    const currentUser = user.filter(({email}) => email === emailCurrent.email);
    currentUser[0].projectIds.push(projectId);
 
    try {
        
    const AddProjectId = await User.findByIdAndUpdate(currentUser[0]._id, { $set: { projectIds: currentUser[0].projectIds } },{ new: true });
    res.status(201).json(currentUser[0].projectIds);
    } catch (error) {
        console.error('Error adding projectIds:', error);
        res.status(500).json({ message: 'Internal Server Error' });
       }
       


   
}

module.exports = addProject;