const express = require("express");
const router = express.Router();
const User = require("../models/users");
const AuthController = require("../controllers/users.controller");
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../validators/auth");

const mongoose = require("mongoose");
// router.post("/signin", (req, res) => {});

router.post(
  "/signup",
  validateSignupRequest,
  isRequestValidated,
  AuthController.signup
);

////////////////////////////////////// User singn ////////////////////

router.post(
  "/signin",
  validateSigninRequest,
  isRequestValidated,
  AuthController.signin
);

router.post(
  "/signout",
  AuthController.signout
);

module.exports = router;
