const express = require("express");
const {
  handleAssigneeSubmit,
  handleReviewerSubmit,
  handleStoryReviewersSubmit,
  assigneeData
} = require("../controllers/prTrackerController");

const PRTrackerRouter = express.Router();

PRTrackerRouter.get("/assignee", assigneeData);
PRTrackerRouter.post("/assignee", handleAssigneeSubmit);
PRTrackerRouter.post("/reviewer", handleReviewerSubmit);
PRTrackerRouter.post("/storyreviewers", handleStoryReviewersSubmit);

module.exports = PRTrackerRouter;
