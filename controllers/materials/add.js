const { v4: uuidv4 } = require('uuid');
const { Projects } = require("../../models/estimate");
const sumMaterials = require("../../helpers/sumMaterialsFunction");
const getGeneral = require("../../helpers/getGeneralFunction");

const add = async (req, res) => {
const material = req.body;
const { _id } = req.user;
const {projectId} = req.params;
const newId = uuidv4();

const project = await Projects.findById({ owner: _id, _id: projectId },
    '-createdAt -updatedAt');

const newMaterials = project.materials;


    newMaterials.push({
            id: newId,
            title: material.title,
            order: material.order,
            date: material.date,
            sum: material.sum
    });


try {
const updateMaterial = await Projects.findByIdAndUpdate(projectId, { $set: { materials: newMaterials } },{ new: true })

const materialsArray = await Projects.findById(projectId);

const sumMaterial = sumMaterials(materialsArray.materials);

const updateSum = await Projects.findByIdAndUpdate(projectId, { $set: { materialsTotal: sumMaterial } }, { new: true })

const generalArray = await Projects.findById(projectId);

const generalResult = getGeneral(generalArray.total, generalArray.materialsTotal, generalArray.advancesTotal);

const updateGeneral = await Projects.findByIdAndUpdate(projectId, { $set: { general: generalResult } }, { new: true })
res.status(201).json(newMaterials);
} catch (error) {
    console.error('Error adding material:', error);
    res.status(500).json({ message: 'Internal Server Error' });
   }
}

module.exports = add;