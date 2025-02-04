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
    const worksheet = XLSX.utils.aoa_to_sheet([]); // Create an empty sheet
    workbook.SheetNames.push(sheetName); // Add sheet name to the workbook
    workbook.Sheets[sheetName] = worksheet; // Add the empty sheet to the workbook
    return worksheet;
  }
  return workbook.Sheets[sheetName];
};

/**
 * Add a row for the "Assignee" type
 * @param {Object} worksheet - The worksheet object
 * @param {Object} data - The data for the row
 */
const addAssigneeRow = (worksheet, data) => {
  const row = [
    data.storyNumber,
    { t: "s", v: data.storyName, l: { Target: data.storyLink } }, // Hyperlink
    "", // Empty for column C
    data.prLink,
    data.requiredReviewer1,
    "", // Empty for column F
    data.requiredReviewer2,
  ];
  XLSX.utils.sheet_add_aoa(worksheet, [row], { origin: -1 });
};

/**
 * Add a row for the "Reviewer" type
 * @param {Object} worksheet - The worksheet object
 * @param {Object} data - The data for the row
 */
const addReviewerRow = (worksheet, data) => {
  const row = [
    data.storyNumber,
    "", // Empty for column B
    "", // Empty for column C
    "", // Empty for column D
    "", // Empty for column E
    data.overallGrading,
    "", // Empty for column G
    data.criticalComments, // Red cell
    data.codingGuidelineComments, // Orange cell
  ];
  XLSX.utils.sheet_add_aoa(worksheet, [row], { origin: -1 });

  // Add styles for critical and coding guideline comments
  const ref = worksheet["!ref"] || "A1";
  const lastRow = parseInt(ref.split(":")[1].replace(/^\D+/g, ""), 10); // Calculate the last row number
  worksheet[`H${lastRow}`] = {
    v: data.criticalComments,
    s: { fill: { fgColor: { rgb: "FF0000" } } }, // Red fill
  };
  worksheet[`I${lastRow}`] = {
    v: data.codingGuidelineComments,
    s: { fill: { fgColor: { rgb: "FFA500" } } }, // Orange fill
  };
};

/**
 * Save data to Excel
 * @param {String} type - Type of data ("Assignee" or "Reviewer")
 * @param {Object} data - The data to be saved
 */
const saveDataToExcel = (type, data) => {
  const workbook = loadOrCreateWorkbook();
  const sheetName = "PR Tracker";
  const worksheet = loadOrCreateWorksheet(workbook, sheetName);

  if (type === "Assignee") {
    addAssigneeRow(worksheet, data);
  } else if (type === "Reviewer") {
    addReviewerRow(worksheet, data);
  }

  workbook.Sheets[sheetName] = worksheet;
  XLSX.writeFile(workbook, filePath);
};

module.exports = { saveDataToExcel };
