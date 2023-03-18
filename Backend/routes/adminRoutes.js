const express = require("express");
const admin = require("../controllers/adminControllers")

const adminRouter = express.Router();


adminRouter.route("/userdocs").get(admin.getUsers);
adminRouter.route("/changestatus/:id").post(admin.changeStatus);


module.exports = adminRouter;