const { Projects } = require("../../models/estimate");
const {User} = require("../../models/user");

const removeProject = async (req, res) => {
    
    const { _id } = req.user;
    const user = await User.findById(_id);
  
    if(user.role === "customer") {
      return res.status(403).json({ message: "У вас не має прав для здійснення операції" });
    }
    
    const {projectId} = req.params; 
    const project = await Projects.findById({ owner: _id, _id: projectId },
      '-createdAt -updatedAt');
  

      const projectIdsArr = user?.projectIds.findIndex(({id}) => id.toString() === projectId);

 if(projectIdsArr === -1) {
  return res.status(403).json({ message: "У вас не має прав для здійснення операції" });
 }

 const projectIdsArrFilter = user?.projectIds.filter(({id}) => id.toString() === projectId);

if(projectIdsArrFilter[0].allowLevel === "read") {
  return res.status(403).json({ message: "Вам надано права лише для перегляду цього кошторису" });
}

    const projectAllowList = project.allowList;
    for(let i = 0; i < projectAllowList.length; i++) {
      const userId = await User.findById(projectAllowList[i]);
      const listId = userId.projectIds.filter(item => item.toString() !== projectId);
      const updateProjectId = await User.findByIdAndUpdate(projectAllowList[i], { $set: { projectIds: listId } },{ new: true });
      
     
    }

 

    try {
        const removeProject = await Projects.findOneAndDelete({owner: _id, _id: projectId });
        res.status(200).json(removeProject);
       } catch (error) {
        console.error('Error adding positions:', error);
        res.status(404).json({ message: 'Not found' });
       }
}

module.exports = removeProject;