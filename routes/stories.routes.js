const express = require("express");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const Stories = require("../models/stories");
const AuthController = require("../controllers/stories.controller");
const uploadS3 = require("../common-middleware/index");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/addstories",
    uploadS3.uploadS3.array("story_file"),
  AuthController.createStories
);

router.get(
    "/displaystories",
    AuthController.getAllStories
  );

router.get( "/getviewcount/:sid", 
uploadS3.requireSignin,
AuthController.getviewcount);

module.exports = router;