// Table Model (for UI data presentation)
const tableSchema = new mongoose.Schema({
  storyReviewersForm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StoryReviewersForm",
    required: true,
  },
  actions: { type: String }, 
});

module.exports = mongoose.model("Table", tableSchema);
