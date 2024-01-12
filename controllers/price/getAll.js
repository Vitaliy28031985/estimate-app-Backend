const { Price } = require("../../models/price");

const getAll = async (req, res) => {
    const { _id } = req.user;
    const result = await Price.find({ owner: _id });
    res.json(result);
}

module.exports = getAll