const { Projects } = require("../../models/estimate");

const update = async (req, res) => {
    const { _id } = req.user;
    const { projectId } = req.params;
    const {title, description} = req.body;

    try {
        const updateProject = await Projects.findByIdAndUpdate({owner: _id,  _id: projectId }, {title, description}, {new: true});
        res.status(200).json(updateProject);
    } catch (error) {
        console.error('Error update project:', error);
        res.status(404).json({ message: 'Not found' });
    }
}

module.exports = update;