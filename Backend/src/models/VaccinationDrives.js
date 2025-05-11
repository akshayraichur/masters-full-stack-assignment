const mongoose = require("mongoose");

const vaccinationDriveSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	date: {
		type: Date,
		required: true,
	},
	dosesCount: {
		type: Number,
		required: true,
	},
	applicableClasses: {
		type: [String],
		required: true,
	},
});

const VaccinationDrive = mongoose.model("VaccinationDrive", vaccinationDriveSchema);

module.exports = VaccinationDrive;
