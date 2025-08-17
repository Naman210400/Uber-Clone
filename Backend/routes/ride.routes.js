const express = require("express");
const { authUser, authCaptain } = require("../middlewares/auth.middleware");
const { body, query } = require("express-validator");
const RideController = require("../controllers/ride.controller");
const rideRouter = express.Router();

rideRouter.get(
  "/get-fares",
  [
    query("pickupLocation")
      .isLength({ min: 3 })
      .withMessage("Pickup location is required"),
    query("dropOffLocation")
      .isLength({ min: 3 })
      .withMessage("DropOff location is required"),
  ],
  authUser,
  RideController.getFares
);

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

rideRouter.post(
  "/accept-ride/:rideId",
  [
    (req, res, next) => {
      if (!req.params.rideId || !/^[a-fA-F0-9]{24}$/.test(req.params.rideId)) {
        return res.status(400).json({ errors: [{ msg: "Invalid ride ID" }] });
      }
      next();
    },
  ],
  authCaptain,
  RideController.acceptRide
);

rideRouter.post(
  "/confirm-ride/:rideId",
  [
    body("otp").isLength({ min: 6, max: 6 }).withMessage("OTP is required"),
    (req, res, next) => {
      if (!req.params.rideId || !/^[a-fA-F0-9]{24}$/.test(req.params.rideId)) {
        return res.status(400).json({ errors: [{ msg: "Invalid ride ID" }] });
      }
      next();
    },
  ],
  authCaptain,
  RideController.confirmRide
);

rideRouter.get(
  "/:rideId",
  [
    (req, res, next) => {
      if (!req.params.rideId || !/^[a-fA-F0-9]{24}$/.test(req.params.rideId)) {
        return res.status(400).json({ errors: [{ msg: "Invalid ride ID" }] });
      }
      next();
    },
  ],
  RideController.getRideDetails
);

rideRouter.post("/finish-ride/:rideId", authCaptain, RideController.finishRide);

module.exports = rideRouter;
