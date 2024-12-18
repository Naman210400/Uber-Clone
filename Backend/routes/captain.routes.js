const express = require("express");
const { body } = require("express-validator");
const CaptainController = require("../controllers/captain.controller");
const { authCaptain } = require("../middlewares/auth.middleware");

const captainRouter = express.Router();

captainRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Minimum 6 characters required for password"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("Minimum 3 characters required for first name"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Minimum 3 characters required for vehicle color"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Minimum 3 characters required for vehicle plate"),
    body("vehicle.capacity")
      .isLength({ min: 1 })
      .withMessage("Minimum 3 characters required for vehicle capacity"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  CaptainController.createCaptain
);

captainRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Minimum 6 characters required for password"),
  ],
  CaptainController.loginCaptain
);

captainRouter.get("/", authCaptain, CaptainController.captainProfile);
captainRouter.get("/logout", authCaptain, CaptainController.logoutCaptain);

module.exports = captainRouter;
