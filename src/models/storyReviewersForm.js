// StoryReviewersForm Model
const storyReviewersFormSchema = new mongoose.Schema({
  storyNumber: { type: Number, required: true, unique: true },
  storyName: { type: String, required: true },
  storyLink: { type: String, required: true },
  workingPerson: { type: String, required: true },
  reviewer1: { type: String, required: true },
  reviewer2: { type: String, required: true },
});
module.exports = mongoose.model("StoryReviewersForm", storyReviewersFormSchema);
