const mongoose = require('mongoose');

const PricingRuleSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Weekend Surge"
  type: {
    type: String,
    enum: ['markup', 'multiplier'], 
    required: true
  },
  value: { type: Number, required: true }, // e.g., 1.5 (for multiplier) or 50 (for markup)
  
  // When does this rule apply?
  conditions: {
    days: [{ type: Number }], // [0, 6] for Sunday, Saturday
    startTime: { type: String }, // "18:00"
    endTime: { type: String },   // "21:00"
    courtType: { type: String }  // "indoor"
  }
}, { timestamps: true });

module.exports = mongoose.model('PricingRule', PricingRuleSchema);