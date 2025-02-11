const XLSX = require("xlsx");
const fs = require("fs");

const filePath = "./PR_Review_Tracker.xlsx";

/**
 * Load or create a workbook
 */
const loadOrCreateWorkbook = () => {
  if (fs.existsSync(filePath)) {
    return XLSX.readFile(filePath);
  }
  return XLSX.utils.book_new();
};

/**
 * Load or create a worksheet
 * @param {Object} workbook - The workbook object
 * @param {String} sheetName - The name of the sheet
 */
const loadOrCreateWorksheet = (workbook, sheetName) => {
  if (!workbook.Sheets[sheetName]) {
    const worksheet = XLSX.utils.aoa_to_sheet([]);
    workbook.SheetNames.push(sheetName);
    workbook.Sheets[sheetName] = worksheet;
    return worksheet;
  }
  return workbook.Sheets[sheetName];
};

/**
 * Find a row index by storyNumber
 * @param {Array} data - Parsed sheet data
 * @param {String} storyNumber - Story Number to search for
 */
const findRowIndexByStoryNumber = (data, storyNumber) => {
  return data.findIndex(row => row[0] === storyNumber);
};

/**
 * Add or update an assignee row
 * @param {Array} sheetData - Parsed sheet data
 * @param {Object} data - The data for the row
 * @param {Number} rowIndex - Index of the row to update, or -1 if new
 */
const addAssigneeRow = (sheetData, data, rowIndex) => {
  const row = [
    data.storyNumber,
    { t: "s", v: data.storyName, l: { Target: data.storyLink } },
    data.storyLink,
    data.sprintNumber,
    data.prLink,
    data.workingPerson,
    data.reviewer1,
    data.reviewer2,
  ];

  if (rowIndex !== -1) {
    sheetData[rowIndex] = row;
  } else {
    sheetData.push(row);
  }
  return sheetData;
};

/**
 * Add a row for the "Reviewer" type
 * @param {Array} sheetData - Parsed sheet data
 * @param {Object} data - The data for the row
 */
const addReviewerRow = (sheetData, data) => {
  const row = [
    data.storyNumber, "", "", "", "", data.overallGrading, "", data.criticalComments, data.codingGuidelineComments
  ];
  sheetData.push(row);
  return sheetData;
};

/**
 * Save data to Excel
 * @param {String} type - Type of data ("assignee" or "reviewer")
 * @param {Object} data - The data to be saved
 */
const saveDataToExcel = (type, data) => {
  const workbook = loadOrCreateWorkbook();
  const sheetName = "PR Tracker";
  const worksheet = loadOrCreateWorksheet(workbook, sheetName);
  let sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  if (sheetData.length === 0) {
    sheetData.push(["Story Number", "Story Name", "Story Link", "Sprint Number", "PR Link", "Working Person", "Reviewer 1", "Reviewer 2", "Is Active"]);
  }

  const rowIndex = findRowIndexByStoryNumber(sheetData, data.storyNumber);

  if (type === "assignee") {
    sheetData = addAssigneeRow(sheetData, data, rowIndex);
  } else if (type === "reviewer") {
    sheetData = addReviewerRow(sheetData, data);
  }

  const updatedWorksheet = XLSX.utils.aoa_to_sheet(sheetData);
  workbook.Sheets[sheetName] = updatedWorksheet;
  XLSX.writeFile(workbook, filePath);
};

module.exports = { saveDataToExcel };
