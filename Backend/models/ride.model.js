const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  captainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "captain",
  },
  pickupLocation: {
    type: String,
    required: true,
  },
  dropOffLocation: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
    enum: ["car", "motorcycle", "auto"],
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
    default: "pending",
  },
  duration: {
    type: Number,
  }, // in seconds
  distance: {
    type: Number,
  }, // in meters
  paymentId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  signature: {
    type: String,
  },
  otp: {
    type: String,
    select: false,
    required: true,
  },
});

const rideModel = mongoose.model("ride", rideSchema);
module.exports = rideModel;
