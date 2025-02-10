const express = require("express");

const { submitreview } = require("../controllers/storyReviewController");

const router = express.Router();

router.route("/review-submit").post(submitreview);

//todo
// router.route("/delete-story").delete(deletestory);

module.exports = router;
