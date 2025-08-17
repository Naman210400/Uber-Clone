const { validationResult } = require("express-validator");
const RideService = require("../services/ride.service");
const MapsService = require("../services/maps.service");
const { sendMessage } = require("../socket");
const {
  SendFailureResponse,
  SendSuccessResponse,
} = require("../helpers/response.helper");
const rideModel = require("../models/ride.model");

exports.getFares = async (req, res) => {
  const { pickupLocation, dropOffLocation } = req.query;
  try {
    const fares = await RideService.getFare({
      origin: pickupLocation,
      destination: dropOffLocation,
    });
    return SendSuccessResponse(res, 200, fares, "Fares fetched successfully");
  } catch (error) {
    console.error("Error fetching fares:", error);
    return SendFailureResponse(res, 500, "Failed to fetch fares");
  }
};

exports.createRide = async (req, res) => {
  const { pickupLocation, dropOffLocation, vehicleType } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return SendFailureResponse(res, 400, errors.array());
  }
  try {
    const fare = await RideService.getFare({
      origin: pickupLocation,
      destination: dropOffLocation,
    });

    const pickupCoordinates = await MapsService.getAddressCoordinates(
      pickupLocation
    );
    const captains = await MapsService.getCaptainsByRadius(
      pickupCoordinates.lat,
      pickupCoordinates.lng,
      150
    );

    if (captains.length > 0) {
      const ride = await RideService.createRide({
        pickupLocation,
        dropOffLocation,
        fare: fare[vehicleType],
        userId: req.user._id,
        vehicleType,
      });

      const rideDetails = await rideModel.findById(ride._id).populate("userId");
      await Promise.all(
        captains.map(async (captain) => {
          sendMessage(
            { event: "new-ride", data: rideDetails },
            captain.socketId
          );
        })
      );
      return SendSuccessResponse(res, 201, ride, "Ride created successfully");
    } else {
      return SendFailureResponse(
        res,
        404,
        "No captains available in your area"
      );
    }
  } catch (error) {
    console.error("Error creating ride:", error);
    return SendFailureResponse(res, 500, "Failed to create ride");
  }
};

exports.acceptRide = async (req, res) => {
  const { rideId } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return SendFailureResponse(res, 400, errors.array());
  }
  try {
    const ride = await RideService.acceptRide({
      rideId,
      captainId: req.captain._id,
    });
    if (!ride) {
      return SendFailureResponse(
        res,
        404,
        "Ride not found or already accepted"
      );
    }

    const rideDetails = await rideModel
      .findById(rideId)
      .populate("userId")
      .populate("captainId")
      .select("+otp");
    sendMessage(
      { event: "ride-accepted", data: rideDetails },
      rideDetails.userId.socketId
    );
    return SendSuccessResponse(res, 201, ride, "Ride accepted successfully");
  } catch (error) {
    console.error("Error accepting ride:", error);
    return SendFailureResponse(
      res,
      500,
      error.message || "Failed to accept ride"
    );
  }
};

exports.confirmRide = async (req, res) => {
  const { otp } = req.body;
  const { rideId } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return SendFailureResponse(res, 400, errors.array());
  }
  try {
    const ride = await RideService.confirmRide({
      rideId,
      captainId: req.captain._id,
      otp,
    });
    if (!ride) {
      return SendFailureResponse(res, 404, "Ride not found");
    }
    sendMessage({ event: "ride-confirmed", data: ride }, ride.userId.socketId);

    return SendSuccessResponse(res, 201, ride, "Ride confirmed successfully");
  } catch (error) {
    console.error("Error confirming ride:", error);
    return SendFailureResponse(
      res,
      500,
      error.message || "Failed to confirm ride"
    );
  }
};

exports.getRideDetails = async (req, res) => {
  const { rideId } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return SendFailureResponse(res, 400, errors.array());
  }

  try {
    const ride = await rideModel
      .findById(rideId)
      .populate("userId")
      .populate("captainId");
    if (!ride) {
      return SendFailureResponse(res, 404, "Ride not found");
    }
    return SendSuccessResponse(
      res,
      200,
      ride,
      "Ride details fetched successfully"
    );
  } catch (error) {
    console.error("Error fetching ride details:", error);
    return SendFailureResponse(
      res,
      500,
      error.message || "Failed to fetch ride details"
    );
  }
};

exports.finishRide = async (req, res) => {
  const { rideId } = req.params;
  try {
    const ride = await RideService.finishRide({
      rideId,
      captainId: req.captain._id,
    });
    if (!ride) {
      return SendFailureResponse(
        res,
        404,
        "Ride not found or already finished"
      );
    }
    sendMessage({ event: "ride-finished", data: ride }, ride.userId.socketId);
    return SendSuccessResponse(res, 200, ride, "Ride finished successfully");
  } catch (error) {
    console.error("Error finishing ride:", error);
    return SendFailureResponse(
      res,
      500,
      error.message || "Failed to finish ride"
    );
  }
};
