const mongoose = require("mongoose");

const storyReviewSchema = new mongoose.Schema({
  storyId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "StorySubmission"
  },
  storyNumber: { type: Number, required: true },
  storyName:{ type: String, required: true },
  storyLink: { type: String, required: true },
  prLink: {type: String},
  workingPerson: { type: String, required: true },
  reviewer:{type:String, required: true},
  overallGrading: { type: String },
  criticalCommentsCount: { type: Number },
  comment: { type: String },
});

const StoryReview = mongoose.model("StoryReview", storyReviewSchema);

module.exports = StoryReview;
