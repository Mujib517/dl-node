const mongoose = require('mongoose');

module.exports = mongoose.model("Product", {
  brand: { type: String, required: true },
  model: { type: String, required: true },
  price: { type: Number },
  inStock: { type: Boolean, default: false },
  lastUpdated: { type: Date, default: Date.now }
});