const { response } = require("express");
const Logs = require("../models/logs");

exports.getLogs = async (req, res) => {
  let { index, size, search } = req.query;
  let articles;

  try {
    // If "page" and "pageSize" are not sent we will default them to 1 and 50.
    page = parseInt(index, 10) || 0;
    pageSize = parseInt(size, 10) || 10;

    if (search.length > 0) {
      articles = await Logs.aggregate([
        { $match: { $text: { $search: `${search}` } } },
        {
          $sort: { date: -1 },
        },
        {
          $facet: {
            metadata: [{ $count: "totalCount" }],
            data: [{ $skip: page * pageSize }, { $limit: pageSize }],
          },
        },
      ]);
    } else {
      articles = await Logs.aggregate([
        { $match: {} },
        {
          $sort: { date: -1 },
        },
        {
          $facet: {
            metadata: [{ $count: "totalCount" }],
            data: [{ $skip: page * pageSize }, { $limit: pageSize }],
          },
        },
      ]);
    }

    return res.status(200).json({
      success: true,
      articles: {
        metadata: {
          totalCount: articles[0].metadata[0].totalCount,
          page,
          pageSize,
        },
        data: articles[0].data,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

exports.getLogsByBusId = async (req, res) => {
  const { busId } = req.params;
  const logs = await Logs.findOne({ busId: busId }).select({ __v: 0, _id: 0 });
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

exports.updateLog = async (req, res) => {
  const { name, date, busId, partName, partReturn, partIssue } = req.body;

  const filter = { busId: busId };
  const update = {
    $set: {
      name,
      busId,
      date,
      partName,
      partIssue,
      partReturn,
    },
  };
  const options = { new: true };

  Logs.findOneAndUpdate(filter, update, options)
    .then((response) => {
      res.status(200).json({
        updatedDocument: response,
        message: "Log Updated!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

exports.deleteLog = async (req, res) => {
  const { busId } = req.query;
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
