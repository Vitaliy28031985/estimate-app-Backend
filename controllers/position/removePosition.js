const { Projects } = require("../../models/estimate");
const {User} = require("../../models/user");
const sumEstimate = require("../../helpers/sumEstimateFunction");
const sumDataForDelete = require("../../helpers/sumForDelete");
const getGeneral = require("../../helpers/getGeneralFunction");

const removePosition = async (req, res) => {

    const { _id } = req.user;
    const user = await User.findById(_id);
  
    if(user.role === "customer") {
      return res.status(403).json({ message: "У вас не має прав для здійснення операції" });
    }

    const { projectId, estimateId, positionId } = req.params;
    let nawData = null;
    let estimatesArray = [];
    let totalPositions = 0;
    let updateEstimate = null;
    let updateEstimates = null;
    const projectsArr = await Projects.find();

    const projectIdsArr = user?.projectIds.findIndex(({id}) => id.toString() === projectId);

    if(projectIdsArr === -1) {
     return res.status(403).json({ message: "У вас не має прав для здійснення операції" });
    }
   
    const projectIdsArrFilter = user?.projectIds.filter(({id}) => id.toString() === projectId);
   
   if(projectIdsArrFilter[0].allowLevel === "read") {
     return res.status(403).json({ message: "Вам надано права лише для перегляду цього кошторису" });
   }

    for(let i = 0; i < projectsArr.length; i++) {
        if(projectsArr[i]._id.toString() === projectId) {
            estimatesArray = projectsArr[i].estimates;
            estimatesArray.forEach((value, key) => {
                if(estimatesArray[key]._id.toString() === estimateId) {
                    if(estimatesArray[key].positions.length === 0 || estimatesArray[key].positions.length === 1) {
                        nawData = {};
                        totalPositions = 0;
                    }
                    nawData = estimatesArray[key].positions.filter(({id}) => id !== positionId);
                    totalPositions = sumDataForDelete(nawData)
                  
                    estimatesArray[key].positions = nawData;
                    estimatesArray[key].total = totalPositions
                    updateEstimate = estimatesArray[key];  
                }                
            })
            projectsArr[i].estimates.forEach((value, key) => {
                if(projectsArr[i].estimates[key]._id.toString() === estimatesArray) {
                    projectsArr[i].estimates[key] = updateEstimate;
                }
            })         
        }
         
    }
    // and for

    updateEstimates = projectsArr.filter(({_id}) => _id.toString() === projectId);
 

    try {
        const updateEstimate = await Projects.findByIdAndUpdate(projectId, { $set: { estimates: updateEstimates[0].estimates } },{ new: true });
    
    
          
      const estimatesArray = await Projects.findById(projectId);
      const totalSum = sumEstimate(estimatesArray)
          
    const updateSum = await Projects.findByIdAndUpdate(projectId, { $set: { total: totalSum } }, { new: true })

    const generalArray = await Projects.findById(projectId);

    const generalResult = getGeneral(generalArray.total, generalArray.materialsTotal, generalArray.advancesTotal);
    
    const updateGeneral = await Projects.findByIdAndUpdate(projectId, { $set: { general: generalResult } }, { new: true })

        res.status(201).json(nawData);
       } catch (error) {
        console.error('Error delete positions:', error);
        res.status(500).json({ message: 'Internal Server Error' });
       }



}

    module.exports = removePosition;