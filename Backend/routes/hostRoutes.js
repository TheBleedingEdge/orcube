const express = require("express");
const Host = require("../controllers/hostControllers");
const protect = require("../middleware/authMiddleware")
const multer = require("multer");

const hostRouter = express.Router();

hostRouter.route("/spaceuploadpic").post(protect, Host.getImage);
hostRouter.route("/spaceupload").post(protect, Host.getSpace);

module.exports = hostRouter;