const express = require("express");
const router = express.Router();
const { createVaccinationDrive } = require("../controllers/drives.controller");

router.post("/create", createVaccinationDrive);

module.exports = router;
