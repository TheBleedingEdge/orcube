const express = require("express");
const Host = require("../controllers/hostControllers");
const multer = require("multer");

const hostRouter = express.Router();

// const storage = multer.memoryStorage()
// const upload = multer({storage: storage})

hostRouter.route("/spaceuploadpic").post( Host.getImage);
hostRouter.route("/spaceupload").post(Host.getSpace);

module.exports = hostRouter;