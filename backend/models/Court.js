const mongoose = require('mongoose');

const CourtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['indoor', 'outdoor'], required: true },
  basePrice: { type: Number, required: true },
  image: { type: String, required: true } // <-- Add this line
}, { timestamps: true });

module.exports = mongoose.model('Court', CourtSchema);