const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const priceSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      }
}, {versionKey: false, timestamps: true});

const unitsSchema = new Schema({
  title: { type: String, required: true },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }
}, {versionKey: false, timestamps: true});

const Price = model('price', priceSchema);
const Units = model('units', unitsSchema);

module.exports = { Price, Units};