const { Projects } = require("../../models/estimate");
const {User} = require("../../models/user");

const update = async (req, res) => {

    const { _id } = req.user;
    const user = await User.findById(_id);
  
    if(user.role === "customer") {
      return res.status(403).json({ message: "У вас не має прав для здійснення операції" });
    }

    const { projectId, estimateId } = req.params;
    const {title} = req.body;

    let newData = null;

    const projectsArr = await Projects.find();
    for(let i = 0; i < projectsArr.length; i++) {
        if(projectsArr[i]._id.toString() === projectId) {
            const estimatesArray = projectsArr[i];
            console.log(estimatesArray)

            if(estimatesArray.estimates.length === 1 || estimatesArray.estimates.length === 0) {
                newData = [];
            }

            estimatesArray.estimates.forEach((value, key) => {
                if(estimatesArray.estimates[key]._id.toString() === estimateId) {
                    estimatesArray.estimates[key].title = title
                }
              
                newData = estimatesArray.estimates;
              
            })
        }
    }

    try {
        const updateEstimate = await Projects.findByIdAndUpdate(projectId, { $set: { estimates: newData} },{ new: true });
        res.status(200).json(newData);
    } catch (error) {
        console.error('Error update estimate:', error);
        res.status(404).json({ message: 'Not found' });
       }

}

module.exports = update;