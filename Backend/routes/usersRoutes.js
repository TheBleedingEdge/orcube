const express = require("express");
const user = require("../controllers/userControllers");

const userRouter = express.Router();


userRouter.route("/register").post(user.registerUser);
userRouter.route("/getspaces").get(user.getSpaces);
userRouter.route("/login").post(user.loginUser);
userRouter.route("/details/:id").get(user.clickProduct);
userRouter.route("/check-availability").post(user.checkAvailability);
userRouter.route("/getbookingdetails").post(user.getbookingDetails);
userRouter.route("/getbookingdetails").post(user.getbookingDetails);
userRouter.route("/search").post(user.searchSpaces);

module.exports = userRouter;