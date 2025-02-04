const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PORT } = require("./utils/constants");
const authRouter = require("./routes/authRoutes");
const PRTrackerRouter = require("./routes/prTrackerRoutes");
const connectDB = require("./database/dbConfig");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/submit", PRTrackerRouter);
app.use("/auth", authRouter);

const startApp = () => {
  connectDB()
    .then(() => {
      console.log("DB is connected");
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Error connecting DB: ", err);
    });
};

module.exports = startApp;
