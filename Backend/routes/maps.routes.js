const express = require("express");
const { authCaptain } = require("../middlewares/auth.middleware");
const MapsController = require("../controllers/maps.controller");
const { query } = require("express-validator");

const mapsRouter = express.Router();

mapsRouter.get(
  "/get-coordinates",
  [query("address").isLength({ min: 3 }).withMessage("Address is required")],
  authCaptain,
  MapsController.getCoordinates
);

mapsRouter.get(
  "/get-distance-time",
  [
    query("origin").isLength({ min: 3 }).withMessage("Origin is required"),
    query("destination")
      .isLength({ min: 3 })
      .withMessage("Destination is required"),
  ],
  authCaptain,
  MapsController.getDistanceAndTime
);

mapsRouter.get(
  "/get-suggestions",
  [query("input").isLength({ min: 3 }).withMessage("Input is required")],
  authCaptain,
  MapsController.getAutoCompleteSuggestions
);

module.exports = mapsRouter;
