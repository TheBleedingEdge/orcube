const express = require("express");
const Host = require("../controllers/hostControllers");
const auth = require("../middleware/authMiddleware")
const multer = require("multer");

const router = express.Router();

router.route("/spaceuploadpic").post(Host.getImage)
router.route("/spaceupload").post(auth.protect,auth.protectHost,Host.getSpace);

module.exports = router;