const mongoose = require("mongoose");
const { DATABASE } = require("../utils/constants");

const connectDB = async () => {
  await mongoose.connect(DATABASE.URI);
};
module.exports = connectDB;
