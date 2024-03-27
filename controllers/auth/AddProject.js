const {User} = require("../../models/user");
const { Projects } = require("../../models/estimate");

const addProject = async (req, res) => {
    const { _id } = req.user;
    const {projectId} = req.params; 
    const {email, allowLevel} = req.body;
    const emailCurrent = email;

    const user = await User.findById(_id);

   
  
    if(user.role === "customer") {
      return res.status(403).json({ message: "У вас не має прав для здійснення операції!" });
    }


    const project = await Projects.findById({ owner: _id, _id: projectId },
        '-createdAt -updatedAt');

    if(user._id.toString() !== project.owner.toString()) {
        return res.status(403).json({ message: "Ви не маєте прав для надання доступ іншим користувачам!" });
    }
     
    const users = await User.find();

    const currentUserEmail = users.findIndex(({email}) => email === emailCurrent);
    
    if(currentUserEmail === -1) {
        return res.status(403).json({ message: `Користувача з таким ${emailCurrent.email} не існує!` }); 
    }

    const currentUser = users.filter(({email}) => email === emailCurrent);

    const currentId = currentUser[0].projectIds.some(({id}) => id.toString() === projectId);

       

    if(currentId) {
        return res.status(403).json({ message: "Доступ до цього кошторису цьому користувачу вже надано" });   
    }
   
    currentUser[0].projectIds.push({id: projectId, allowLevel});
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