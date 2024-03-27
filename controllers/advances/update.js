const { Projects } = require("../../models/estimate");
const {User} = require("../../models/user");
const sumMaterials = require("../../helpers/sumMaterialsFunction");
const getGeneral = require("../../helpers/getGeneralFunction");

const update = async (req, res) => {
    

    const { _id } = req.user;
    const user = await User.findById(_id);
  
    if(user.role === "customer") {
      return res.status(403).json({ message: "У вас не має прав для здійснення операції" });
    }

    const advances = req.body;
    const {projectId, advancesId} = req.params;
   
    let newAdvancesList = [];

    const project = await Projects.findById({ owner: _id, _id: projectId },
        '-createdAt -updatedAt');

    const advancesArr = project.advances;
        
        for(let i = 0; i < advancesArr.length; i++) {
            if(advancesArr[i].id === advancesId) {
                newAdvancesList.push({id: advancesArr[i].id, _id: advancesArr[i]._id, ...advances })
            } else {
                newAdvancesList.push({
                    id: advancesArr[i].id,
                    _id: advancesArr[i]._id,
                    comment: advancesArr[i].comment,
                    date: advancesArr[i].date,
                    sum: advancesArr[i].sum
                   })
            }
            
        }


        try {
            const updateAdvances = await Projects.findByIdAndUpdate(projectId, { $set: { advances: newAdvancesList } },{ new: true })
            const advancesArr = await Projects.findById(projectId);
            const updateSum = await Projects.findByIdAndUpdate(projectId, { $set: { advancesTotal: sumMaterials(advancesArr.advances) } }, { new: true })
        
            const generalArray = await Projects.findById(projectId);

            const generalResult = getGeneral(generalArray.total, generalArray.materialsTotal, generalArray.advancesTotal);
      
            const updateGeneral = await Projects.findByIdAndUpdate(projectId, { $set: { general: generalResult } }, { new: true })
            
            
            res.status(201).json(newAdvancesList);
       
       
       }
       catch (error) {
           console.error('Error updating material:', error);
           res.status(500).json({ message: 'Internal Server Error' });

       }
        
}

module.exports = update;