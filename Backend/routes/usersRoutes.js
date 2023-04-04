const express = require("express");
const user = require("../controllers/userControllers");

const userRouter = express.Router();


userRouter.route("/register").post(user.registerUser);
userRouter.route("/getspaces").get(user.getSpaces);
userRouter.route("/login").post(user.loginUser);



module.exports = userRouter;