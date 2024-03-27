const { Projects } = require("../../models/estimate");
const {User} = require("../../models/user");
const multiplication = require("../../helpers/multiplicationFunction");
const sumDataForDelete = require("../../helpers/sumForDelete");
const sumEstimate = require("../../helpers/sumEstimateFunction");
const getGeneral = require("../../helpers/getGeneralFunction");

const update = async (req, res) => {

    const { _id } = req.user;
    const user = await User.findById(_id);
  
    if(user.role === "customer") {
      return res.status(403).json({ message: "У вас не має прав для здійснення операції" });
    }
    
    const { projectId, estimateId, positionId } = req.params;
    const {title, unit, number, price} = req.body; 

const updatePosition = {title, unit, number, price, result: multiplication(number, price)}
  
let newData = null;
let newPositionsArr = null;
let totalPositions = 0;


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
            const estimatesArr = projectsArr[i].estimates;
            estimatesArr.forEach((value, key) => {
                if(estimatesArr[key]._id.toString() === estimateId) {

                    const positionArr = estimatesArr[key].positions;

                    positionArr.forEach((value, key) => {
                        if(positionArr[key].id === positionId) {
                            positionArr[key].title = updatePosition.title;
                            positionArr[key].unit = updatePosition.unit;
                            positionArr[key].number = updatePosition.number;
                            positionArr[key].price = updatePosition.price;
                            positionArr[key].result = updatePosition.result;
                            totalPositions = sumDataForDelete(positionArr);
                            newPositionsArr  = positionArr;  
                        }
                    })

                    estimatesArr[key].positions = newPositionsArr;
                    estimatesArr[key].total = totalPositions
                    newData = estimatesArr;

                }
            })

        }
    }

    console.log(newData)


    try {
 const updateEstimate = await Projects.findByIdAndUpdate(projectId, { $set: { estimates: newData} },{ new: true });
    
          
      const estimatesArray = await Projects.findById(projectId);
      const totalSum = sumEstimate(estimatesArray)
          
    const updateSum = await Projects.findByIdAndUpdate(projectId, { $set: { total: totalSum } }, { new: true })
       
    const generalArray = await Projects.findById(projectId);

    const generalResult = getGeneral(generalArray.total, generalArray.materialsTotal, generalArray.advancesTotal);
    
    const updateGeneral = await Projects.findByIdAndUpdate(projectId, { $set: { general: generalResult } }, { new: true })
    
    res.status(201).json(newData);
       } catch (error) {
        console.error('Error adding positions:', error);
        res.status(500).json({ message: 'Internal Server Error' });
       }
       
}

module.exports = update;

