const { validationResult } = require("express-validator");
const {
  SendFailureResponse,
  SendSuccessResponse,
} = require("../helpers/response.helper");
const captainModel = require("../models/captain.model");
const CaptainService = require("../services/captain.service");
const blacklistTokenModel = require("../models/blacklistToken.model");

exports.createCaptain = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return SendFailureResponse(res, 400, errors.array());
  }

  const { fullname, email, password, vehicle } = req.body;
  const { firstname, lastname } = fullname;
  const { color, plate, capacity, vehicleType } = vehicle;

  const isCaptainAlready = await captainModel.findOne({ email });

  if (isCaptainAlready) {
    return SendFailureResponse(res, 400, "Captain already exist");
  }

  const hashPassword = await captainModel.hashPassword(password);
  const captain = await CaptainService.register({
    firstname,
    lastname,
    email,
    password: hashPassword,
    color,
    plate,
    capacity,
    vehicleType,
  });

  const token = await captain.generateAuthToken();
  res.cookie("token", token);

  return SendSuccessResponse(
    res,
    201,
    { captain, token },
    "Captain successfully registered"
  );
};

exports.loginCaptain = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return SendFailureResponse(res, 400, errors.array());
  }

  const { email, password } = req.body;
  const captain = await captainModel.findOne({ email }).select("+password");

  if (!captain) {
    return SendFailureResponse(res, 400, "Invalid email or password");
  }

  const passwordMatching = await captain.comparePassword(password);

  if (!passwordMatching) {
    return SendFailureResponse(res, 400, "Invalid Password");
  }

  const token = await captain.generateAuthToken();
  res.cookie("token", token);

  return SendSuccessResponse(
    res,
    200,
    { captain, token },
    "Captain successfully logged in"
  );
};

exports.captainProfile = async (req, res) => {
  return SendSuccessResponse(
    res,
    200,
    req.captain,
    "Captain profile fetched successfully"
  );
};

exports.logoutCaptain = async (req, res) => {
  res.clearCookie("token");

  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await blacklistTokenModel.create({ token });

  return SendSuccessResponse(res, 200, null, "Captain logged out successfully");
};
