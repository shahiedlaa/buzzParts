const Logs = require("../models/logs");

exports.getLogs = async (req, res) => {
  let logs;
  const { busId } = req.query;

  if (busId) {
    logs = await Logs.findOne({ busId: busId }).select({ __v: 0, _id: 0 });
  } else logs = await Logs.find().select({ __v: 0, _id: 0 });

  res.status(200).json({ body: logs });
};

exports.postLog = async (req, res) => {
  const { name, date, busId, partName, partReturn, partIssue } = req.body;

  const logs = new Logs({
    name,
    date,
    busId,
    partName,
    partReturn,
    partIssue,
  });

  logs
    .save()
    .then((createdLog) => {
      res.status(201).json({
        createdLog,
        message: "Log Created!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

exports.deleteLog = async (req, res) => {
  const { busId } = req.body;
  Logs.deleteOne({ busId: busId })
    .then((response) => {
      res.status(200).json({
        message: "Log Deleted!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};
