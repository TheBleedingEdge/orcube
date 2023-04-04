const express = require("express");
const admin = require("../controllers/adminControllers")
const protect = require("../middleware/authMiddleware")

const adminRouter = express.Router();


adminRouter.route("/userdocs").get(protect, admin.getUsers);
adminRouter.route("/changestatus/:id").post(protect, admin.changeStatus);
adminRouter.route("/gettoapprovespace").get(protect, admin.getToApproveSpace);
adminRouter.route("/changespacestatus/:id").post(protect, admin.changeSpaceStatus);


module.exports = adminRouter;