const {User} = require("../../models/user");
const { Projects } = require("../../models/estimate");

const deleteProject = async (req, res) => {
    const { _id } = req.user;
    const {projectId} = req.params; 
    const emailCurrent = req.body;

    const user = await User.findById(_id);
  
    if(user.role === "customer") {
      return res.status(403).json({ message: "У вас не має прав для здійснення операції" });
    }

    const project = await Projects.findById({ owner: _id, _id: projectId },
        '-createdAt -updatedAt');
     
    const users = await User.find();
     
    const currentUserEmail = users.findIndex(({email}) => email === emailCurrent.email);

    if(currentUserEmail === -1) {
        return res.status(403).json({ message: `Користувача з таким ${emailCurrent.email} не існує` }); 
    }
    
   

    const currentUser = users.filter(({email}) => email === emailCurrent.email);
    
     const newProjectIds = currentUser[0].projectIds.filter(item => item.toString() !== projectId);

     const currentId = currentUser[0].projectIds.findIndex(({_id}) => _id.toString() === projectId);

     if(currentId === -1) {
        return res.status(403).json({ message: "Доступ до цього кошторису цьому користувачу не було надано" });   
    }


     const newAllowList = project.allowList.filter(item => item.toString() !== currentUser[0]._id.toString());
     

  
    try {
    const addAllow = await Projects.findByIdAndUpdate(projectId, { $set: { allowList: newAllowList } },{ new: true })  
    const AddProjectId = await User.findByIdAndUpdate(currentUser[0]._id, { $set: { projectIds: newProjectIds } },{ new: true });
    res.status(201).json(newProjectIds);
    } catch (error) {
        console.error('Error adding projectIds:', error);
        res.status(500).json({ message: 'Internal Server Error' });
       }
       


   
}

module.exports = deleteProject;