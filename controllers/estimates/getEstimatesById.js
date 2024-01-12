const { Estimate } = require("../../models/estimate");

const getEstimatesById = async (req, res) => { 
    const { estimatesId } = req.params;

    try {

      const positionById = await Estimate.findById(estimatesId);
      
    
    res.status(200).json(positionById);
  } catch (error) {
    console.error('Error adding positions:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

}

module.exports = getEstimatesById;