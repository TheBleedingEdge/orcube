const express = require("express");
const user = require("../controllers/userControllers");

const userRouter = express.Router();


userRouter.route("/login").post(user.loginUser);
userRouter.route("/register").post(user.registerUser);


module.exports = userRouter;