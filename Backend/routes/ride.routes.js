const express = require("express");
const { authUser } = require("../middlewares/auth.middleware");
const { body } = require("express-validator");
const RideController = require("../controllers/ride.controller");
const rideRouter = express.Router();

rideRouter.post(
  "/create",
  [
    body("pickupLocation")
      .isLength({ min: 3 })
      .withMessage("Pickup location is required"),
    body("dropOffLocation")
      .isLength({ min: 3 })
      .withMessage("DropOff location is required"),
    body("vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  authUser,
  RideController.createRide
);

module.exports = rideRouter;
