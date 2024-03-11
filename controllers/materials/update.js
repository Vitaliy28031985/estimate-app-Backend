const { Projects } = require("../../models/estimate");
const sumMaterials = require("../../helpers/sumMaterialsFunction");
const getGeneral = require("../../helpers/getGeneralFunction");

const update = async (req, res) => {
    const { _id } = req.user;
    const material = req.body;
    const {projectId, materialsId} = req.params;
   
    let newMaterialsList = [];

    const project = await Projects.findById({ owner: _id, _id: projectId },
        '-createdAt -updatedAt');

    const materialsArr = project.materials;
        
        // console.log(material);

        for(let i = 0; i < materialsArr.length; i++) {
            if(materialsArr[i].id === materialsId) {
                newMaterialsList.push({id: materialsArr[i].id, _id: materialsArr[i]._id, ...material })
            } else {
                newMaterialsList.push({id: materialsArr[i].id,
                    _id: materialsArr[i]._id,
                    title: materialsArr[i].title,
                    order: materialsArr[i].order,
                    date: materialsArr[i].date,
                    sum: materialsArr[i].sum
                   })
            }
            
        }


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
           console.error('Error updating material:', error);
           res.status(500).json({ message: 'Internal Server Error' });

       }
        
}

module.exports = update;