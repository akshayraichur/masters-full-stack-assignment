const fs = require("fs");
const csv = require("csv-parser");

const StudentModel = require("../models/Students");

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
	console.log("req.body: ", name, id, studentClass);
	try {
		const student = await StudentModel.create({ name, id, class: studentClass });
		console.log("student: ", student);
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
		console.log("err: ", error);
		if (error.code === 11000) {
			return res.status(400).json({ message: "Student already exists", status: false });
		}
		res.status(500).json({ message: "Something went wrong", status: false });
	}
};

// PUT /students/:id/vaccination
const updateVaccinationStatus = async (req, res) => {
	const { id } = req.params;
	const { drive, status } = req.body;

	try {
		const updatedStudent = await StudentModel.findOneAndUpdate(
			{ id },
			{ $set: { [`vaccinatedDrives.${drive}`]: status } },
			{ new: true }
		);

		if (!updatedStudent) {
			return res.status(404).json({ message: "Student not found" });
		}

		res.status(200).json({ message: "Vaccination status updated", student: updatedStudent });
	} catch (err) {
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = {
	addStudent,
	getStudents,
	bulkUploadStudents,
	updateStudentByID,
	updateVaccinationStatus,
};
