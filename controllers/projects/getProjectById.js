const { Projects } = require("../../models/estimate");

const getProjectById = async(req, res) => {
    const { _id } = req.user;
    const {projectId} = req.params;

    const project = await Projects.findById({ owner: _id, _id: projectId },
        '-createdAt -updatedAt');
    
        if(!project) {
            return res.status(404).json({ message: 'Not found' });  
               }
               res.status(200).json(project);

};

module.exports = getProjectById;