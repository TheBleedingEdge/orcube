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
userRouter.route("/cancelbook/:bookingId").post(user.cancelBooking);
userRouter.route("/submitreviews").post(user.createReview);
userRouter.route("/getreviews").post(user.getReviews);
userRouter.route("/getuserdata/:userId").get(user.getUser);
userRouter.route("/submitprofile/:userId").put(user.updateUser);
userRouter.route("/resetpassword").post(user.getForgotPasswordLink);
userRouter.route("/changepassword").post(user.resetPassword);

module.exports = userRouter;