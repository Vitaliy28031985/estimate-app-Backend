const {User} = require("../../models/user");
const { Projects } = require("../../models/estimate");

const addProject = async (req, res) => {
    const { _id } = req.user;
    const {projectId} = req.params; 
    const emailCurrent = req.body;

    const project = await Projects.findById({ owner: _id, _id: projectId },
        '-createdAt -updatedAt');
     
    const user = await User.find();
    const currentUser = user.filter(({email}) => email === emailCurrent.email);
    currentUser[0].projectIds.push(projectId);
    project.allowList.push(currentUser[0]._id);
    

 
    try {
    const addAllow = await Projects.findByIdAndUpdate(projectId, { $set: { allowList: project.allowList } },{ new: true })  
    const AddProjectId = await User.findByIdAndUpdate(currentUser[0]._id, { $set: { projectIds: currentUser[0].projectIds } },{ new: true });
    res.status(201).json(currentUser[0].projectIds);
    } catch (error) {
        console.error('Error adding projectIds:', error);
        res.status(500).json({ message: 'Internal Server Error' });
       }
       


   
}

module.exports = addProject;