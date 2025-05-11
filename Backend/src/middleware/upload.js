// middleware/upload.js
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // temporary storage
module.exports = upload;
