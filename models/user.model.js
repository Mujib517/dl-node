const mongoose = require('mongoose');

const UserModel = mongoose.model("User", {
  username: { type: String, unique: true, required: [true, "Username is required"] },
  password: { type: String, required: true },
  active: { type: Boolean, default: true },
  lastUpdated: { type: Date, default: Date.now }
});


module.exports = UserModel;