const { Projects } = require("../../models/estimate");
const sumMaterials = require("../../helpers/sumMaterialsFunction");
const getGeneral = require("../../helpers/getGeneralFunction");

const remove = async (req, res) => {
    const { _id } = req.user;
    const {projectId, advancesId} = req.params;
   

    const project = await Projects.findById({ owner: _id, _id: projectId },
        '-createdAt -updatedAt');
        
        const newAdvancesList = project.advances.filter(({id}) => id !== advancesId);
     
        
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
            console.error('Error deleting advances:', error);
            res.status(500).json({ message: 'Internal Server Error' });

        }

}
module.exports = remove;