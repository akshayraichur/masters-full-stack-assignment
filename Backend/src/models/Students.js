const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	class: {
		type: String,
		required: true,
	},
	vaccination_status: {
		type: Boolean,
		required: true,
		default: false,
	},
	vaccination_drives: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "VaccinationDrive",
		default: [],
	},
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
