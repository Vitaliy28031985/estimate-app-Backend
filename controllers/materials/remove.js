
const { Projects } = require("../../models/estimate");
const {User} = require("../../models/user");
const sumMaterials = require("../../helpers/sumMaterialsFunction");
const getGeneral = require("../../helpers/getGeneralFunction");

const remove = async (req, res) => {
    
    
    const { _id } = req.user;
    const user = await User.findById(_id);
  
    if(user.role === "customer") {
      return res.status(403).json({ message: "У вас не має прав для здійснення операції" });
    }
  

    const {projectId, materialsId} = req.params;
   

    const project = await Projects.findById({ owner: _id, _id: projectId },
        '-createdAt -updatedAt');
        
        const newMaterialsList = project.materials.filter(({id}) => id !== materialsId);
     
        
        try {
             const updateMaterial = await Projects.findByIdAndUpdate(projectId, { $set: { materials: newMaterialsList } },{ new: true })
            const materialsArr = await Projects.findById(projectId);
            const updateSum = await Projects.findByIdAndUpdate(projectId, { $set: { materialsTotal: sumMaterials(materialsArr.materials) } }, { new: true })
        
            const generalArray = await Projects.findById(projectId);

            const generalResult = getGeneral(generalArray.total, generalArray.materialsTotal, generalArray.advancesTotal);
      
            const updateGeneral = await Projects.findByIdAndUpdate(projectId, { $set: { general: generalResult } }, { new: true })
            
            const newArr = await Projects.findById(projectId);
    
            
            res.status(201).json(newMaterialsList);
        
        
        }
        catch (error) {
            console.error('Error deleting material:', error);
            res.status(500).json({ message: 'Internal Server Error' });

        }

}
module.exports = remove;