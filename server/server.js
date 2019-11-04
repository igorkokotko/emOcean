// const path = require("path");
const express = require("express");
const dotenv = require("dotenv"); // env variables

dotenv.config({ path: "./config/config.env" });

// Route
const auth = require("./routes/auth");
// run express
const app = express();

// Body parser
app.use(express.json());

app.use("/api/v1/auth", auth);

const PORT = process.env.port || 5000;

app.listen(
  PORT,
  console.log(`Port is running on ${process.env.NODE_ENV} mode on port ${PORT}`)
);
