const express = require("express");
const mongoose = require("mongoose");
const authenticationRoutes = require("./routes/authentication.routes");
require("dotenv").config();
const vaccinationDrivesRoutes = require("./routes/vaccinationDrives.routes");

const app = express();

// Initial Config
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

// headers for CORS
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:5173");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Credentials", "true");

	// Handle preflight requests
	if (req.method === "OPTIONS") {
		return res.sendStatus(200);
	}
	next();
});

// Routes with versioning
app.use("/v1/auth", authenticationRoutes);
app.use("/v1/drives", vaccinationDrivesRoutes);

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
