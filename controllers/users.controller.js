const express = require("express");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// ********************SignUp Route middlerware ************************

exports.signup = (req, res) => {
   
//   console.log(req.body);
//   res.send("hello");
  User.findOne({ email: req.body.email }).exec(async(error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registered",
      });
      const { firstName, lastName, email, password, username } = req.body;
      const hash_password = await bcrypt.hash(password, 10);
      const _user = new User({
        firstName,
        lastName,
        email,
        hash_password,
        username
      });
  
    console.log(_user);
    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong ",
          error,
        });
      }
      if (data) {
        return res.status(201).json({
          user: data,
        });
      }
    });
  });
};

////////////////////////////// Login   //////////////////////////////////

exports.signin = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  User.findOne({ email: email }).exec((err, user) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (user) {
      if (user.authenticate(password)) {
        // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        const token = jwt.sign({ _id: user._id , role: user.role}, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        const { _id, firstName, lastName, email, role, fullName } = user;
        res
          .status(200)
          .json({ token, _id, firstName, lastName, email, role, fullName });
      } else {
        return res.status.json({
          message: "incorrect user or email",
        });
      }
    } else {
      return res.status(400).send({ message: "email or password wrong" });
    }
  });
};


exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });

};