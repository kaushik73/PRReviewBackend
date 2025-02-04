const express = require("express");
const {
  handleAssigneeSubmit,
  handleReviewerSubmit,
  handleStoryReviewersSubmit,
} = require("../controllers/prTrackerController");

const PRTrackerRouter = express.Router();

PRTrackerRouter.post("/assignee", handleAssigneeSubmit);
PRTrackerRouter.post("/reviewer", handleReviewerSubmit);
PRTrackerRouter.post("/storyreviewers", handleStoryReviewersSubmit);

module.exports = PRTrackerRouter;
