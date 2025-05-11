const express = require("express");
const router = express.Router();
const {
	createVaccinationDrive,
	getVaccinationDrives,
	generateVaccinationReport,
} = require("../controllers/drives.controller");

router.post("/create", createVaccinationDrive);
router.get("/upcoming", getVaccinationDrives);
router.get("/report", generateVaccinationReport);

module.exports = router;
