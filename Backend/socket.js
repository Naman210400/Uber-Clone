const socket = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");
let io;
const initSocket = (server) => {
  io = socket(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("join", async (data) => {
      const { userId, role } = data;
      if (role === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (role === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
      console.log(
        `User ${userId} with role ${role} joined with socket ID: ${socket.id}`
      );
    });

    socket.on("update-captain-location", async (data) => {
      const { captainId, location } = data;
      await captainModel.findByIdAndUpdate(captainId, {
        location: {
          lat: location.lat,
          lng: location.lng,
        },
      });
      console.log(`Captain ${captainId} location updated:`, location);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

const sendMessage = (messageObject, socketId) => {
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  }
};

module.exports = { initSocket, sendMessage };
