// StoryReviewersForm Model
const mongoose = require("mongoose");

const storySubmissionSchema = new mongoose.Schema({
  storyNumber: { type: Number, required: true, unique: true },
  storyName: { type: String, required: true },
  storyLink: { type: String, required: true },
  prLink: { type: String },
  sprintNumber: { type: Number, required: true },
  workingPerson: { type: String, required: true },
  reviewer1: { type: String, required: true },
  reviewer2: { type: String, required: true },
  isActive:{type: Boolean, default: true}
});

const StorySubmission = mongoose.model(
  "StorySubmission",
  storySubmissionSchema
);

module.exports = StorySubmission;
