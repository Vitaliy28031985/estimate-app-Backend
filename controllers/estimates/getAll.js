const { Estimate } = require('../../models/estimate');


const getAll = async (req, res) => {
    const result = await Estimate.find();
    res.json(result);
}

module.exports = getAll
