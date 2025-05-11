const express = require("express");
const router = express.Router();
const { createVaccinationDrive } = require("../controllers/drives.controller");
const { getVaccinationDrives } = require("../controllers/drives.controller");

router.post("/create", createVaccinationDrive);
router.get("/upcoming", getVaccinationDrives);

module.exports = router;
