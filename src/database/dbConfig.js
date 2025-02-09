require('dotenv').config();
const mongoose = require("mongoose");
// // const { DATABASE } = require("../utils/constants");

const connectDB = async () => {
  // await mongoose.connect(process.env.MONGO_DB_URI);
  await mongoose.connect(process.env.MONGODB_URI);
  
};
module.exports = connectDB;
