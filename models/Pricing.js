// models/Pricing.js
const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  plan: { type: String, required: true },
  cardNumber: { type: String, required: true },
  expiryDate: { type: String, required: true },
  cvv: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Pricing', pricingSchema);
