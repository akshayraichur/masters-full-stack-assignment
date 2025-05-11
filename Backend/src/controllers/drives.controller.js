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

module.exports = {
	createVaccinationDrive,
};
