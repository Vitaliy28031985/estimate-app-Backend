const { Projects } = require("../../models/estimate");

const getProjectById = async(req, res) => {
    const { _id } = req.user;
    const {projectId} = req.params;

    const project = await Projects.findById({ owner: _id, _id: projectId },
        '-createdAt -updatedAt');

        const allowListArr = await project.allowList;
     
        const allow = allowListArr.findIndex(item => item._id.toString() === _id.toString());
      
        const renderProject =  () => {

        if(!project) {
            return res.status(404).json({ message: 'Not found' });  
               }
               res.status(200).json(project);
        } 

        if(_id.toString() !== project?.owner.toString()) {
            if(allow !== -1) {
                return renderProject();
            }
            return res.status(403).json({ message: "Ви не маєте доступу до цього кошторису!" });
        }

        return renderProject();
    

};

module.exports = getProjectById;