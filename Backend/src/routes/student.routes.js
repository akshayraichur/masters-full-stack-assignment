const express = require("express");
const router = express.Router();
const {
	addStudent,
	getStudents,
	bulkUploadStudents,
	updateStudentByID,
	updateVaccinationStatus,
} = require("../controllers/students.controller");
const upload = require("../middleware/upload");

router.post("/add", addStudent);
router.get("/", getStudents);
router.post("/bulk-upload", upload.single("file"), bulkUploadStudents);
router.put("/edit/:id", updateStudentByID);
router.put("/vaccination/:id", updateVaccinationStatus);

module.exports = router;
