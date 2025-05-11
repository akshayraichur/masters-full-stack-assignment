const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
	const { username } = req.body;

	if (!username) {
		return res.status(400).json({
			message: "Username is required",
			status: false,
		});
	}

	if (username.length < 3) {
		return res.status(400).json({
			message: "Username must be at least 3 characters long",
			status: false,
		});
	}

	if (username.length > 20) {
		return res.status(400).json({
			message: "Username must be less than 20 characters long",
			status: false,
		});
	}

	if (username.includes(" ")) {
		return res.status(400).json({
			message: "Username cannot contain spaces",
			status: false,
		});
	}

	if (!/^[a-zA-Z0-9]+$/.test(username)) {
		return res.status(400).json({
			message: "Username must contain only letters and numbers",
			status: false,
		});
	}

	if (username.startsWith(" ")) {
		return res.status(400).json({
			message: "Username cannot start with a space",
			status: false,
		});
	}

	return res.status(200).json({ message: "Login successful", status: true });
});

module.exports = router;
