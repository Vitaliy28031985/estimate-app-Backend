const { Projects } = require("../../models/estimate");
const {User} = require("../../models/user");
const sumEstimate = require("../../helpers/sumEstimateFunction");
const getGeneral = require("../../helpers/getGeneralFunction");


const removeEstimate = async (req, res) => {

  const { _id } = req.user;
  const user = await User.findById(_id);

  if(user.role === "customer") {
    return res.status(403).json({ message: "У вас не має прав для здійснення операції" });
  }

  const { projectId, estimateId } = req.params;

  let newData = null;
   
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
    const estimatesArray = projectsArr[i];
 
  if(estimatesArray.estimates.length === 1 || estimatesArray.estimates.length === 0) {
    newData = [];
  } else {
  const positionsArray = estimatesArray.estimates.filter(({_id}) => _id.toString() !== estimateId);
   newData = positionsArray;
     
        }
     }
  }
  

    try {
        const updateEstimate = await Projects.findByIdAndUpdate(projectId, { $set: { estimates: newData } },{ new: true });
        const estimatesArray = await Projects.findById(projectId);
        const totalSum = sumEstimate(estimatesArray)
            
      const updateSum = await Projects.findByIdAndUpdate(projectId, { $set: { total: totalSum } }, { new: true })
    
      const generalArray = await Projects.findById(projectId);

      const generalResult = getGeneral(generalArray.total, generalArray.materialsTotal, generalArray.advancesTotal);
      
      const updateGeneral = await Projects.findByIdAndUpdate(projectId, { $set: { general: generalResult } }, { new: true })

       res.status(200).json(updateEstimate);
       } catch (error) {
        console.error('Error adding positions:', error);
        res.status(404).json({ message: 'Not found' });
       }

}

module.exports = removeEstimate;