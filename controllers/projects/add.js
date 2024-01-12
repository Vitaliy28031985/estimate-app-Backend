const { Projects } = require("../../models/estimate");

const add = async (req, res) => {
    const {_id} = req.user;
    const { body } = req;
    const result = await Projects.create({...body, owner: _id});
    res.status(201).json(result);
}

module.exports = add