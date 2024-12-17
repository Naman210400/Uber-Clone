const { SendFailureResponse } = require("../helpers/response.helper");
const userModel = require("../models/user.model");
const { HTTP_STATUS_MESSAGE } = require("../utils/constant");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
  const token =
    req?.cookies?.token || req?.headers?.authorization?.split(" ")[1];

  if (!token) {
    return SendFailureResponse(res, 400, HTTP_STATUS_MESSAGE.UNAUTHORIZED);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded["_id"]);
    req.user = user;

    return next();
  } catch (e) {
    return SendFailureResponse(
      res,
      500,
      HTTP_STATUS_MESSAGE.INTERNAL_SERVER_ERROR
    );
  }
};
