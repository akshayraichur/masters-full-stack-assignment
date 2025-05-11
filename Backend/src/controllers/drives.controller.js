const VaccinationDriveModal = require("../models/VaccinationDrives");

const createVaccinationDrive = async (req, res) => {
	const { name, date, dosesCount, applicableClasses } = req.body;
	const vaccinationDrive = await VaccinationDriveModal.create({
		name,
		date,
		dosesCount,
		applicableClasses,
	});
	res.status(201).json(vaccinationDrive);
};

const getVaccinationDrives = async (_, res) => {
	const vaccinationDrives = await VaccinationDriveModal.find({
		date: {
			$gte: new Date(),
			$lte: new Date(new Date().setDate(new Date().getDate() + 30)),
		},
	});
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
