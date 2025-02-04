const { saveDataToExcel } = require("../services/excelService");

const handleAssigneeSubmit = (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ message: "Invalid input!" });
  }

  try {
    saveDataToExcel("assignee", data);
    res
      .status(200)
      .json({ message: "Data for assignee successfully saved to Excel!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving assignee data to Excel!" });
  }
};

const handleReviewerSubmit = (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ message: "Invalid input!" });
  }

  try {
    saveDataToExcel("reviewer", data);
    res
      .status(200)
      .json({ message: "Data for reviewer successfully saved to Excel!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving reviewer data to Excel!" });
  }
};

const handleStoryReviewersSubmit = (req, res) => {};

module.exports = {
  handleAssigneeSubmit,
  handleReviewerSubmit,
  handleStoryReviewersSubmit,
};
