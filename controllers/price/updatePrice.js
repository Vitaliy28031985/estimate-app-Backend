const { Price } = require("../../models/price");

const update = async (req, res) => {
    const { _id } = req.user;
    const { priceId } = req.params;
    const {body} = req;

    try {
        const updatePrice = await Price.findByIdAndUpdate({owner: _id,  _id: priceId }, body, {new: true, fields: ['-createdAt', '-updatedAt']});
        res.status(200).json(updatePrice);
    } catch (error) {
        console.error('Error update price:', error);
        res.status(404).json({ message: 'Not found' });
    }
}

module.exports = update;