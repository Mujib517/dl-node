const mongoose = require('mongoose');

module.exports = mongoose.model("Review", {
  productId: { type: String, required: true },
  subject: { type: String, required: true },
  message: String,
  rating: Number,
  lastUpdated: { type: Date, default: Date.now }
});

