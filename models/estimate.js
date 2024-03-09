const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const positionSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  unit: { type: String, required: true },
  number: { type: Number, required: true },
  price: { type: Number, required: true },
  result: { type: Number, required: true },
});
const materialSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  order: { type: String, required: true },
  date: {type: String, required: true},
  sum: {type: Number, required: true}
});

const advanceSchema = new Schema({
  id: { type: String, required: true },
  comment: { type: String, required: false },
  date: {type: String, required: true},
  sum: {type: Number, required: true}
});

const estimateSchema = new Schema({
  title: { type: String, required: true },
  positions: [positionSchema],
  total: { type: Number, required: true, default: 0 },
});


const projectSchema = new Schema({
  title: { type: String, required: true },
  estimates: [estimateSchema],
  description: { type: String, required: true },
  total: { type: Number, required: true, default: 0 },
  materials: [materialSchema],
  advances: [advanceSchema],
  materialsTotal: { type: Number, required: true, default: 0 },
  advancesTotal: { type: Number, required: true, default: 0 },
  general: { type: Number, required: true, default: 0 },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }
}, {versionKey: false, timestamps: true})

const Position = model('position', positionSchema);
const Estimate = model("estimates", estimateSchema);
const Projects = model("projects", projectSchema);

module.exports = { Estimate, Position, Projects };
