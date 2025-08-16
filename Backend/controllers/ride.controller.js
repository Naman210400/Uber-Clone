const { validationResult } = require("express-validator");
const rideService = require("../services/ride.service");
const {
  SendFailureResponse,
  SendSuccessResponse,
} = require("../helpers/response.helper");

exports.createRide = async (req, res) => {
  const { pickupLocation, dropOffLocation, vehicleType } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return SendFailureResponse(res, 400, errors.array());
  }
  try {
    const fare = await rideService.getFare({
      origin: pickupLocation,
      destination: dropOffLocation,
    });

    const ride = await rideService.createRide({
      pickupLocation,
      dropOffLocation,
      fare: fare[vehicleType],
      userId: req.user._id,
      vehicleType,
    });
    return SendSuccessResponse(res, 201, ride, "Ride created successfully");
  } catch (error) {
    console.error("Error creating ride:", error);
    return SendFailureResponse(res, 500, "Failed to create ride");
  }
};
