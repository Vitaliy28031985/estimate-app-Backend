const { Price } = require("../../models/price");

const remove = async (req, res) => {
    const { _id } = req.user;
    const { priceId } = req.params;

    console.log(priceId);

    try {
        const removePrice = await Price.findOneAndDelete({owner: _id,  _id: priceId });
        res.status(200).json(removePrice);
    } catch (error) {
        console.error('Error removing price:', error);
        res.status(404).json({ message: 'Not found' });
    }
}

module.exports = remove;
