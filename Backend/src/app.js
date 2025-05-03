const express = require("express");
const mongoose = require("mongoose");
const authenticationRoutes = require("./routes/authentication.routes");
require("dotenv").config();

const app = express();

// Initial Config
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

// Routes
app.use("/auth", authenticationRoutes);

app.listen(3010, () => {
	console.log("Server is running on port 3010");
});
