const reviewerSchema = new mongoose.Schema({
  storyReviewersForm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StoryReviewersForm",
    required: true,
  },
  storyNumber: { type: Number, required: true },
  storyLink: { type: String, required: true },
  workingPerson: { type: String, required: true },
  overallGrading: { type: String },
  criticalCommentsCount: { type: Number },
  comment: { type: String },
});

module.exports = mongoose.model("Reviewer", reviewerSchema);
