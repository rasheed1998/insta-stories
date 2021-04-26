
const jwt = require("jsonwebtoken");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

// const {
//   validateSignupRequest,
//   isRequestValidated,
//   validateSigninRequest,
// } = require("../validators/auth");

const mongoose = require("mongoose");
// router.post("/signin", (req, res) => {});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  });
  
  const accessKeyId = "AKIAZHZPWUIOLM66OAY6";
  const secretAccessKey = "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";
  
  const s3 = new aws.S3({
    accessKeyId,
    secretAccessKey,
  });
  
exports.upload = multer({ storage });
  
//   exports.uploadS3 = multer({
exports.uploadS3 = multer({
    storage: multerS3({
      s3: s3,
      bucket: "bucket-insta",
      acl: "public-read",
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
      },
    }),
  });



  exports.requireSignin = (req, res, next) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
    } else {
      return res.status(400).json({ message: "Authorization required" });
    }
    next();
    //jwt.decode()
  };