const { Projects } = require("../../models/estimate");
const {User} = require("../../models/user");

const update = async (req, res) => {
    
    const { _id } = req.user;
    const user = await User.findById(_id);
  
    if(user.role === "customer") {
      return res.status(403).json({ message: "У вас не має прав для здійснення операції" });
    }

    const { projectId } = req.params;
    const {title, description} = req.body;

    const projectIdsArr = user?.projectIds.findIndex(({id}) => id.toString() === projectId);

 if(projectIdsArr === -1) {
  return res.status(403).json({ message: "У вас не має прав для здійснення операції" });
 }

 const projectIdsArrFilter = user?.projectIds.filter(({id}) => id.toString() === projectId);

if(projectIdsArrFilter[0].allowLevel === "read") {
  return res.status(403).json({ message: "Вам надано права лише для перегляду цього кошторису" });
}

    try {
        const updateProject = await Projects.findByIdAndUpdate({owner: _id,  _id: projectId }, {title, description}, {new: true});
        res.status(200).json(updateProject);
    } catch (error) {
        console.error('Error update project:', error);
        res.status(404).json({ message: 'Not found' });
    }
}

module.exports = update;