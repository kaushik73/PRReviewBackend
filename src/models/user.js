// User Model
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // role: { type: String, enum: ["Developer", "Reviewer", "Admin"], required: true },
  // newPassword: { type: String },
});

module.exports = mongoose.model("User", userSchema);
