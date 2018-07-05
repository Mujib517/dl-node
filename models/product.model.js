const mongoose = require('mongoose');

function priceValidator(value) {
  return value >= 100
}
//minlength: 3, maxlength: 10 

module.exports = mongoose.model("Product", {
  brand: { type: String, required: [true, "Brand is required"] },
  model: { type: String, required: [true, "Model is mandatory"] },
  price: {
    type: Number, validate: { validator: priceValidator }
  },
  inStock: { type: Boolean, default: false },
  image: { type: String },
  lastUpdated: { type: Date, default: Date.now }
});