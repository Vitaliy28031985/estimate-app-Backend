const { Projects } = require("../../models/estimate");

const removeProject = async (req, res) => {
    const { _id } = req.user;
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