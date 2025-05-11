const fs = require("fs");
const csv = require("csv-parser");

const StudentModel = require("../models/Students");
const VaccinationDriveModel = require("../models/VaccinationDrives");

const getStudents = async (req, res) => {
	try {
		const students = await StudentModel.find().sort({ id: 1 });
		if (!students || students.length === 0) {
			return res.status(400).json({ message: "Students not found", status: false });
		}
		res.status(200).json({ message: "Students fetched successfully", students, status: true });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong", status: false });
	}
};

const addStudent = async (req, res) => {
	const { name, id, class: studentClass } = req.body;
	try {
		const student = await StudentModel.create({ name, id, class: studentClass });
		if (!student) {
			return res.status(400).json({ message: "Student not added", status: false });
		}
		res.status(200).json({ message: "Student added successfully", student, status: true });
	} catch (error) {
		if (error.code === 11000) {
			return res.status(400).json({ message: "Student already exists", status: false });
		}
		res.status(500).json({ message: "Something went wrong", status: false });
	}
};

const bulkUploadStudents = async (req, res) => {
	if (!req.file) {
		return res.status(400).json({ message: "No CSV file uploaded", status: false });
	}

	const filePath = req.file.path;
	const students = [];

	try {
		fs.createReadStream(filePath)
			.pipe(csv())
			.on("data", (row) => {
				const student = {
					id: row.id,
					name: row.name,
					class: row.class,
					vaccinated: row.vaccinated === "true" || row.vaccinated === "1",
				};
				students.push(student);
			})
			.on("end", async () => {
				try {
					const inserted = await StudentModel.insertMany(students, { ordered: false }); // `ordered: false` continues inserting even if some fail
					fs.unlinkSync(filePath);
					res.status(200).json({
						message: "Students uploaded successfully",
						status: true,
						insertedCount: inserted.length,
					});
				} catch (insertError) {
					fs.unlinkSync(filePath);
					res.status(500).json({
						message: "Error inserting students",
						status: false,
						error: insertError.message,
					});
				}
			});
	} catch (error) {
		fs.unlinkSync(filePath); // clean up
		res.status(500).json({ message: "Error processing file", status: false });
	}
};

const updateStudentByID = async (req, res) => {
	const { id } = req.params;
	const { name, class: studentClass } = req.body;
	try {
		const student = await StudentModel.findOneAndUpdate(
			{ id: id },
			{ name, class: studentClass },
			{ new: true }
		);
		if (!student) {
			return res.status(400).json({ message: "Student not found", status: false });
		}
		res.status(200).json({ message: "Student updated successfully", student, status: true });
	} catch (error) {
		if (error.code === 11000) {
			return res.status(400).json({ message: "Student already exists", status: false });
		}
		res.status(500).json({ message: "Something went wrong", status: false });
	}
};

const updateVaccinationStatus = async (req, res) => {
	const { id } = req.params;
	const { drive } = req.body;

	try {
		const student = await StudentModel.findOne({ id });
		if (!student) {
			return res.status(400).json({ message: "Student not found", status: false });
		}

		const vaccinationDrive = await VaccinationDriveModel.findOne({ name: drive });
		if (!vaccinationDrive) {
			return res.status(400).json({ message: "Vaccination drive not found", status: false });
		}

		if (!vaccinationDrive.applicableClasses.includes(student.class)) {
			return res.status(400).json({
				message: "Vaccination drive not applicable to the student's class",
				status: false,
			});
		}

		if (student.vaccination_drives.includes(drive)) {
			return res.status(400).json({
				message: "Vaccination already recorded for this drive",
				status: false,
			});
		}

		student.vaccination_drives.push(drive);
		student.vaccination_status = true;
		await student.save();

		res.status(200).json({ message: "Vaccination drive recorded", student });
	} catch (err) {
		res.status(500).json({ message: "Internal server error", error: err.message });
	}
};

const getTotalStudents = async (_, res) => {
	try {
		const totalStudents = await StudentModel.find();
		res.status(200).json({
			message: "Total students fetched successfully",
			totalStudents: totalStudents,
			totalStudentsCount: totalStudents.length,
			status: true,
		});
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error: error.message });
	}
};

const getTotalStudentsVaccinated = async (_, res) => {
	try {
		const students = await StudentModel.find({}, "vaccination_drives"); // fetch only needed field
		const drives = await VaccinationDriveModel.find({}, "dosesCount");

		// Total doses given = sum of all vaccination_drives arrays
		const totalDosesGiven = students.reduce(
			(sum, student) => sum + student.vaccination_drives.length,
			0
		);

		// Total planned doses = sum of all dosesCount
		const totalPlannedDoses = drives.reduce((sum, drive) => sum + drive.dosesCount, 0);

		const vaccinationPercentage =
			totalPlannedDoses === 0 ? 0 : ((totalDosesGiven / totalPlannedDoses) * 100).toFixed(2);

		res.status(200).json({
			totalDosesGiven,
			totalPlannedDoses,
			vaccinationPercentage: `${vaccinationPercentage}%`,
			status: true,
		});
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error: error.message });
	}
};

module.exports = {
	addStudent,
	getStudents,
	bulkUploadStudents,
	updateStudentByID,
	updateVaccinationStatus,
	getTotalStudents,
	getTotalStudentsVaccinated,
};
