const VaccinationDriveModal = require("../models/VaccinationDrives");

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

module.exports = {
	createVaccinationDrive,
	getVaccinationDrives,
};
