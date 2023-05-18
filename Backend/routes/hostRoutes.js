const express = require("express");
const Host = require("../controllers/hostControllers");
const auth = require("../middleware/authMiddleware")
const multer = require("multer");

const router = express.Router();

router.route("/spaceuploadpic").post(Host.getImage)
router.route("/spaceupload").post(auth.protect,auth.protectHost,Host.getSpace);
router.route("/getbookingdata").post(auth.protect,auth.protectHost,Host.getBookings);
router.route("/approvebook/:bookingId").post(auth.protect,auth.protectHost,Host.approveBooking);
router.route("/getbookpercent/:HostId").post(Host.getBookMonthPercentage);
router.route("/getmonthlyincome/:hostID").get(Host.getMonthlyIncome);

module.exports = router;