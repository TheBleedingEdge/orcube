const express = require("express");
const admin = require("../controllers/adminControllers");
const auth = require("../middleware/authMiddleware");

const adminRouter = express.Router();

adminRouter.route("/userdocs").get(auth.protect,auth.protectAdmin, admin.getUsers);
adminRouter.route("/changestatus/:id").get(auth.protect,auth.protectAdmin, admin.changeStatus);
adminRouter.route("/gettoapprovespace").get(auth.protect, auth.protectAdmin, admin.getToApproveSpace);
adminRouter.route("/changespacestatus/:id").get(auth.protect, auth.protectAdmin, admin.changeSpaceStatus);


module.exports = adminRouter;