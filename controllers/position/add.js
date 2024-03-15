const { v4: uuidv4 } = require('uuid');
const { Projects } = require("../../models/estimate");
const {User} = require("../../models/user");
const multiplication = require("../../helpers/multiplicationFunction")
const sumData = require("../../helpers/sumFunction");
const sumEstimate = require("../../helpers/sumEstimateFunction");
const getGeneral = require("../../helpers/getGeneralFunction");


const add = async (req, res) => {
  
  const { _id } = req.user;
  const user = await User.findById(_id);

  if(user.role === "customer") {
    return res.status(403).json({ message: "У вас не має прав для здійснення операції" });
  }

 

  const {position} = req.body;
  const {positionId, projectId} = req.params
  const newId = uuidv4();

  const positionNew = {
      id: newId,
      title: position.title,
      unit: position.unit,
      number: position.number,
      price: position.price,
      result: multiplication( position.number, position.price)
  }
  
let newEstimate = null;
let totalPositions = 0;

const estimatesArr = await Projects.find();



for (let i = 0; i < estimatesArr.length; i++) {

  const estimateEl = estimatesArr[i].estimates.filter(({ _id }) => _id.toString() === positionId);
 
  estimateEl.map(item => item.positions.push(positionNew))
 
  totalPositions = sumData(estimateEl.map(item => item))
 
   estimateEl.map(item => item.total = totalPositions)
   
  if (estimatesArr[i]._id.toString() === projectId) {

  estimatesArr[i].estimates.forEach((value, key) => {
  if(estimatesArr[i].estimates[key]._id.toString() === positionId)
      estimatesArr[i].estimates[key] = estimateEl[0];
      
}) 
  } 
  newEstimate = estimatesArr.filter(({ _id }) => _id.toString() === projectId);

 
}
 

try {
 
  const updateEstimate = await Projects.findByIdAndUpdate(projectId, { $set: { estimates: newEstimate[0].estimates } },{ new: true });

      
  const estimatesArray = await Projects.findById(projectId);
  const totalSum = sumEstimate(estimatesArray)
      
const updateSum = await Projects.findByIdAndUpdate(projectId, { $set: { total: totalSum } }, { new: true })

const generalArray = await Projects.findById(projectId);

const generalResult = getGeneral(generalArray.total, generalArray.materialsTotal, generalArray.advancesTotal);

const updateGeneral = await Projects.findByIdAndUpdate(projectId, { $set: { general: generalResult } }, { new: true })

    res.status(201).json(newEstimate);
   } catch (error) {
    console.error('Error adding positions:', error);
    res.status(500).json({ message: 'Internal Server Error' });
   }
   
};

module.exports = add;
