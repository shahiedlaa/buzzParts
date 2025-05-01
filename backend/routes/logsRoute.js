const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const logsController = require("../controllers/logs");

router.get("/", logsController.getLogs);

router.post("/", upload.none(), logsController.postLog);

router.delete("/", logsController.deleteLog);

module.exports = router;
