const express = require("express");
const { body } = require("express-validator");
const UserController = require("../controllers/user.controller");
const { authUser } = require("../middlewares/auth.middleware");

const userRouter = express.Router();

userRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Minimum 6 characters required for password"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("Minimum 3 characters required for first name"),
  ],
  UserController.createUser
);

userRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Minimum 6 characters required for password"),
  ],
  UserController.loginUser
);

userRouter.get("/", authUser, UserController.userProfile);

module.exports = userRouter;
