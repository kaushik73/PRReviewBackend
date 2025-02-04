// Assignee Model
const assigneeSchema = new mongoose.Schema({
  storyReviewersForm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StoryReviewersForm",
    required: true,
  },
  storyNumber: { type: Number, required: true },
  storyLink: { type: String, required: true },
  prLink: { type: String, required: true },
});

module.exports = mongoose.model("Assignee", assigneeSchema);
