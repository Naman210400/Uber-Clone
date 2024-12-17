const { validationResult } = require("express-validator");
const {
  SendFailureResponse,
  SendSuccessResponse,
} = require("../helpers/response.helper");
const userModel = require("../models/user.model");
const UserService = require("../services/user.service");

exports.createUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return SendFailureResponse(res, 400, errors.array());
  }

  const { fullname, email, password } = req.body;
  const { firstname, lastname } = fullname;

  const hashPassword = await userModel.hashPassword(password);
  const user = await UserService.register({
    firstname,
    lastname,
    email,
    password: hashPassword,
  });

  const token = await user.generateAuthToken();
  res.cookie("token", token);

  return SendSuccessResponse(res, 201, token, "User successfully registered");
};

exports.loginUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return SendFailureResponse(res, 400, errors.array());
  }

  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return SendFailureResponse(res, 400, "Invalid email or password");
  }

  const passwordMatching = await user.comparePassword(password);

  if (!passwordMatching) {
    return SendFailureResponse(res, 400, "Invalid Password");
  }

  const token = await user.generateAuthToken();
  res.cookie("token", token);

  return SendSuccessResponse(res, 200, token, "User successfully logged in");
};

exports.userProfile = async (req, res) => {
  return SendSuccessResponse(
    res,
    200,
    req.user,
    "User profile fetched successfully"
  );
};
