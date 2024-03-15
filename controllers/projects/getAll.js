const { Projects } = require("../../models/estimate");
const {User} = require("../../models/user");

const getAll = async (req, res) => {
    const { _id } = req.user;
    let projectsIdArr = [];
    try {
    const result = await Projects.find({ owner: _id });
    const projectsAll = await Projects.find();
    const user = await User.findById(_id);
    const projectsIdList = user.projectIds;

    for(let i = 0; i < projectsIdList.length; i++) {
        
        const projectsIdArrFilter = projectsAll.filter(({_id}) => _id.toString() === projectsIdList[i].toString())
        projectsIdArr.push(projectsIdArrFilter[0]);
    }

    for(let i = 0; i < result.length; i++) {
        projectsIdArr.push(result[i]);
    }

    res.json(projectsIdArr);
    } catch (error) {
        console.error('Error adding projects:', error);
        res.status(500).json({ message: 'Internal Server Error' });
       }
}

module.exports = getAll