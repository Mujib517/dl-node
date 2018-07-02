const mongoose = require('mongoose');

module.exports = mongoose.model("Product", {
  brand: String,
  model: String,
  price: Number,
  inStock: Boolean,
  lastUpdated: { type: Date, default: Date.now }
});