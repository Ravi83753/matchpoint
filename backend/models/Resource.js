const mongoose = require('mongoose');

// Coach Schema
const CoachSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String }, // e.g., "Singles Strategy"
  hourlyRate: { type: Number, default: 200 },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

// Equipment Schema
const EquipmentSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Yonex Racket"
  totalStock: { type: Number, required: true },
  pricePerUnit: { type: Number, default: 50 }
}, { timestamps: true });

const Coach = mongoose.model('Coach', CoachSchema);
const Equipment = mongoose.model('Equipment', EquipmentSchema);

module.exports = { Coach, Equipment };