const { Projects } = require("../../models/estimate");

const getAll = async (req, res) => {
    const { _id } = req.user;
    try {
    const result = await Projects.find({ owner: _id });
    res.json(result);
    } catch (error) {
        console.error('Error adding projects:', error);
        res.status(500).json({ message: 'Internal Server Error' });
       }
}

module.exports = getAll