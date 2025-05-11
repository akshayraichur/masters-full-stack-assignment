const StudentModel = require("../models/Students");
const VaccinationDriveModal = require("../models/VaccinationDrives");
const dayjs = require("dayjs");

const createVaccinationDrive = async (req, res) => {
	const { name, date, doses, classes } = req.body;

	try {
		// Check for duplicate name
		const existingByName = await VaccinationDriveModal.findOne({ name });
		if (existingByName) {
			return res.status(400).json({
				message: "Vaccination drive with same name already exists",
				status: false,
			});
		}

		// Check for duplicate date
		const existingByDate = await VaccinationDriveModal.findOne({ date });
		if (existingByDate) {
			return res.status(400).json({
				message: "A vaccination drive is already scheduled for this date",
				status: false,
			});
		}

		const vaccinationDrive = await VaccinationDriveModal.create({
			name,
			date,
			dosesCount: doses,
			applicableClasses: classes.split(","),
		});

		res.status(201).json({
			message: "Vaccination drive created successfully",
			status: true,
			data: vaccinationDrive,
		});
	} catch (error) {
		res.status(500).json({
			message: "Something went wrong",
			status: false,
			error: error.message,
		});
	}
};

const getVaccinationDrives = async (_, res) => {
	const vaccinationDrives = await VaccinationDriveModal.find();
	if (!vaccinationDrives) {
		return res.status(404).json({
			message: "No vaccination drives found for next 30 days",
			status: false,
		});
	}
	res.status(200).json({
		message: "Vaccination drives fetched successfully",
		status: true,
		data: vaccinationDrives,
	});
};

const generateVaccinationReport = async (req, res) => {
	const { vaccineName } = req.query;

	try {
		// Optional filter: only students who took a specific vaccine
		const query = vaccineName ? { vaccination_drives: { $in: [vaccineName] } } : {};

		const students = await StudentModel.find(query).lean();
		const allDrives = await VaccinationDriveModal.find().lean();

		const driveMap = {};
		allDrives.forEach((drive) => {
			driveMap[drive.name] = drive;
		});

		const report = students.map((student) => {
			const vaccines = student.vaccination_drives.map((driveName) => {
				const drive = driveMap[driveName];
				return {
					vaccineName: driveName,
					date: drive?.date ? dayjs(drive.date).format("DD-MM-YYYY") : "N/A",
				};
			});

			return {
				name: student.name,
				class: student.class,
				vaccination_status: student.vaccination_status,
				vaccinations: vaccines,
			};
		});

		res.status(200).json({
			data: report,
			totalStudents: report.length,
			status: true,
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to generate report",
			error: error.message,
			status: false,
		});
	}
};

module.exports = {
	createVaccinationDrive,
	getVaccinationDrives,
	generateVaccinationReport,
};
