const { Projects } = require("../../models/estimate");
const sumEstimate = require("../../helpers/sumEstimateFunction");



const removeEstimate = async (req, res) => {
  const { projectId, estimateId } = req.params;

  let newData = null;
   
  const projectsArr = await Projects.find();
  
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
    
    
       res.status(200).json(updateEstimate);
       } catch (error) {
        console.error('Error adding positions:', error);
        res.status(404).json({ message: 'Not found' });
       }

}

module.exports = removeEstimate;