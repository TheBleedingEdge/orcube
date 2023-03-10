const express = require("express");
const { registerUser, loginUser } = require("../controllers/userControllers");

const router = express.Router();


router.route("/login").post(loginUser);
router.route("/register").post(registerUser);


module.exports = router;