const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const PRTrackerRouter = require("./routes/prTrackerRoutes");
const connectDB = require("./database/dbConfig");
const storySubmissionRoute = require("./routes/storySubmissionRoutes.js")
const storyReviewRoute = require("./routes/storyReviewRoutes.js")

const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;
// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/data",(req, res)=>{
  res.send("Hello");
})

app.use("/api/story", storySubmissionRoute);
app.use("/api/review", storyReviewRoute)
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
