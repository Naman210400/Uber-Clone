const express = require("express");
const cors = require("cors");
const cookies = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const connectToDb = require("./db/db");
const userRouter = require("./routes/user.routes");
const captainRouter = require("./routes/captain.routes");

const app = express();

app.use(cors());
app.use(cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDb();

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Welcome to Uber Clone API" });
});

app.use("/users", userRouter);
app.use("/captains", captainRouter);

module.exports = app;
