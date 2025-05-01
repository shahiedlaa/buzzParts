const mongoose = require("mongoose");

const logsSchema = mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  busId: { type: String, unique: true, required: true },
  partName: { type: String, required: true },
  partReturn: { type: String, required: true },
  partIssue: { type: String, required: true },
});

module.exports = mongoose.model("Logs", logsSchema);
