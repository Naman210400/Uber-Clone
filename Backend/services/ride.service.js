const rideModel = require("../models/ride.model");
const MapsService = require("../services/maps.service");
const crypto = require("crypto");

exports.getFare = async ({ origin, destination }) => {
  if (!origin || !destination) {
    throw new Error("Origin, destination are required");
  }

  const distanceTime = await MapsService.getDistanceAndTime(
    origin,
    destination
  );

  const baseFare = {
    auto: 30,
    car: 50,
    motorCycle: 20,
  };

  const farePerKm = {
    auto: 10,
    car: 15,
    motorCycle: 5,
  };

  const farePerMin = {
    auto: 2,
    car: 3,
    motorCycle: 1,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * farePerKm.auto +
        (distanceTime.duration.value / 60) * farePerMin.auto
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * farePerKm.car +
        (distanceTime.duration.value / 60) * farePerMin.car
    ),
    motorcycle: Math.round(
      baseFare.motorCycle +
        (distanceTime.distance.value / 1000) * farePerKm.motorCycle +
        (distanceTime.duration.value / 60) * farePerMin.motorCycle
    ),
  };

  return fare;
};

exports.getOtp = async (digits = 6) => {
  return generateOTP(digits);
};

const generateOTP = (digits) => {
  const otp = crypto
    .randomInt(Math.pow(10, digits - 1), Math.pow(10, digits))
    .toString();
  return otp;
};

exports.createRide = async ({
  pickupLocation,
  dropOffLocation,
  fare,
  userId,
  vehicleType,
}) => {
  if (!pickupLocation || !dropOffLocation || !fare || !userId || !vehicleType) {
    throw new Error(
      "Pickup location, drop off location, fare, userId, and vehicleType are required"
    );
  }

  const ride = rideModel.create({
    pickupLocation,
    dropOffLocation,
    fare,
    userId,
    vehicleType,
    otp: await this.getOtp(),
  });

  return ride;
};

exports.acceptRide = async ({ rideId, captainId, otp }) => {
  if (!rideId || !captainId || !otp) {
    throw new Error("Ride ID, captain ID, and OTP are required");
  }
  const ride = await rideModel.findById(rideId).select("+otp");
  if (!ride) {
    throw new Error("Ride not found");
  }
  if (ride.status !== "pending") {
    throw new Error("Ride already accepted or completed");
  }
  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }
  ride.status = "accepted";
  ride.captainId = captainId;
  return await ride.save();
};
