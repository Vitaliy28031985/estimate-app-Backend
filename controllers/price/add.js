const { Price } = require("../../models/price");

const add = async (req, res) => {
    const {_id} = req.user;
    const { body } = req;
    const result = await Price.create({...body, owner: _id});
    res.status(201).json(result);
}

module.exports = add;