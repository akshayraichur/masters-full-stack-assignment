const express = require("express");
const router = express.Router();
const {
	addStudent,
	getStudents,
	bulkUploadStudents,
	updateStudentByID,
	updateVaccinationStatus,
	getTotalStudents,
	getTotalStudentsVaccinated,
} = require("../controllers/students.controller");
const upload = require("../middleware/upload");

router.post("/add", addStudent);
router.get("/", getStudents);
router.post("/bulk-upload", upload.single("file"), bulkUploadStudents);
router.put("/edit/:id", updateStudentByID);
router.put("/vaccination/:id", updateVaccinationStatus);
router.get("/total", getTotalStudents);
router.get("/total-vaccinated", getTotalStudentsVaccinated);

module.exports = router;
