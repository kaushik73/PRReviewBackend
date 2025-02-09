const express = require("express");

const { submitstory, getallstory, updatestory, closestory } = require("../controllers/storySubmissionController");

const router = express.Router();

router.route("/all-story").get(getallstory);
router.route("/story-submission").post(submitstory);
router.route("/edit-story").put(updatestory);
router.route("/close-story").put(closestory);
//todo
// router.route("/delete-story").delete(deletestory);

module.exports = router;
