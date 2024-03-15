const { v4: uuidv4 } = require('uuid');
const { Projects } = require("../../models/estimate");
const {User} = require("../../models/user");
const sumMaterials = require("../../helpers/sumMaterialsFunction");
const getGeneral = require("../../helpers/getGeneralFunction");

const add = async (req, res) => {

    const { _id } = req.user;
    const user = await User.findById(_id);
  
    if(user.role === "customer") {
      return res.status(403).json({ message: "У вас не має прав для здійснення операції" });
    }

const advance = req.body;
const {projectId} = req.params;
const newId = uuidv4();

const project = await Projects.findById({ owner: _id, _id: projectId },
    '-createdAt -updatedAt');

const newAdvances = project.advances;


    newAdvances.push({
            id: newId,
            comment: advance.comment,
            date: advance.date,
            sum: advance.sum
    });

try {
const updateAdvance = await Projects.findByIdAndUpdate(projectId, { $set: { advances: newAdvances } },{ new: true })

const advancesArray = await Projects.findById(projectId);
const sumAdvances = sumMaterials(advancesArray.advances);

const updateSum = await Projects.findByIdAndUpdate(projectId, { $set: { advancesTotal: sumAdvances } }, { new: true })
 
const generalArray = await Projects.findById(projectId);
const generalResult =  getGeneral(generalArray .total, generalArray .materialsTotal, generalArray .advancesTotal);

const updateGeneral = await Projects.findByIdAndUpdate(projectId, { $set: { general: generalResult } }, { new: true })
res.status(201).json(newAdvances);
} catch (error) {
    console.error('Error adding advances:', error);
    res.status(500).json({ message: 'Internal Server Error' });
   }
}

module.exports = add;