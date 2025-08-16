const { validationResult } = require("express-validator");
const MapsService = require("../services/maps.service");
const {
  SendFailureResponse,
  SendSuccessResponse,
} = require("../helpers/response.helper");

exports.getCoordinates = async (req, res) => {
  const { address } = req.query;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return SendFailureResponse(res, 400, errors.array());
  }

  try {
    const coordinates = await MapsService.getAddressCoordinates(address);
    return SendSuccessResponse(
      res,
      200,
      coordinates,
      "Coordinates fetched successfully"
    );
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return SendFailureResponse(res, 500, "Failed to fetch coordinates");
  }
};

exports.getDistanceAndTime = async (req, res) => {
  const { origin, destination } = req.query;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return SendFailureResponse(res, 400, errors.array());
  }
  try {
    const distanceTime = await MapsService.getDistanceAndTime(
      origin,
      destination
    );
    return SendSuccessResponse(
      res,
      200,
      distanceTime,
      "Distance and time fetched successfully"
    );
  } catch (error) {
    console.error("Error fetching distance and time:", error);
    return SendFailureResponse(res, 500, "Failed to fetch distance and time");
  }
};

exports.getAutoCompleteSuggestions = async (req, res) => {
  const { input } = req.query;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return SendFailureResponse(res, 400, errors.array());
  }
  try {
    const suggestions = await MapsService.getAutoCompleteSuggestions(input);
    return SendSuccessResponse(
      res,
      200,
      suggestions,
      "Suggestions fetched successfully"
    );
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return SendFailureResponse(res, 500, "Failed to fetch suggestions");
  }
};
