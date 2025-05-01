require("dotenv").config();

const bodyparser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const logsRoute = require("./routes/logsRoute");

const app = express();

const ports = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.8q5yvjd.mongodb.net/${process.env.DATABASE}`
  )
  .then(() => {
    app.listen(ports, console.log(`Server is running on port ${ports}`));
  })
  .catch((err) => {
    console.log(`Could not connect to server`, err);
  });

app.use("/api/logs", logsRoute);
