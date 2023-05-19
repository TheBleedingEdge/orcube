const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Space = require("../models/SpaceModel")
const Booking = require("../models/bookingModel")
const Review = require('../models/reviewModel');
const generateToken = require("../util/generateToken");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');


const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'uibfdUYVDBFbdfib234'


module.exports = {
    //register
    registerUser: asyncHandler(async (req, res) => {
        try {
            const { name, email, password, mobile } = req.body;
            const user = await User.create({
                name,
                email,
                password: bcrypt.hashSync(password, bcryptSalt),
                mobile
            })
            const userDoc = await user.save()
            console.log(userDoc);
            if (userDoc) {
                res.status(201).json({
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user._id, jwtSecret, {}),
                })
            }
            else {
                res.status(400)
                throw new Error("error occured")
            }
        } catch (error) {
            // res.status(422).json(error);
            console.log(error);
        }
    }),




    //login
    loginUser: asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const userData = await User.findOne({ email: email })
        if (userData != null) {
            const passOk = bcrypt.compareSync(password, userData.password)
            if (passOk) {
                res.status(201).json({
                    _id: userData._id,
                    name: userData.name,
                    email: userData.email,
                    isAdmin: userData.isAdmin,
                    isHost: userData.isHost,
                    isApplied: userData.isApplied,
                    token: generateToken(userData._id, jwtSecret, {}),
                });
            }
            else {
                res.status(422).json("Password not match")
            }
        } else {
            res.status(422).json("User not found")
        }
    }),



    getSpaces: asyncHandler(async (req, res) => {
        try {
            const spacedocs = await Space.find({ isApproved: true });
            res.json(spacedocs)
        } catch (error) {
            console.log(error);
        }
    }),



    clickProduct: asyncHandler(async (req, res) => {
        try {
            const space = await Space.findById(req.params.id)
            res.json(space)
        } catch (error) {
            // res.status(422).json(error);
            console.log(error);
        }
    }),


    checkAvailability: asyncHandler(async (req, res) => {
        const { spaceid, firstDate, secondDate } = req.body;

        try {
            const overlappingBookings = await Booking.find({
                spaceID: spaceid,
                startDate: { $lt: secondDate },
                endDate: { $gt: firstDate },
                isCancelled: false,
            });

            if (overlappingBookings.length > 0) {
                res.status(200).json({ available: false });
            } else {
                res.status(200).json({ available: true });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while checking availability' });
        }
    }),

    getbookingDetails: asyncHandler(async (req, res) => {
        const { userInfo } = req.body;

        try {
            console.log(userInfo);
            const bookingData = await Booking.find({ userID: userInfo._id }).populate('spaceID')
            if (bookingData) {
                res.status(200).json(bookingData)
            } else {
                res.status(500).json({ message: 'Error occured while fetching Booking Data' })
            }
        } catch (error) {
            console.error(error);
        }
    }),


    // In your controller or route handler

    searchSpaces: asyncHandler(async (req, res) => {
        try {
            const { location, checkIn, checkOut, guests } = req.body;
            const allSpaces = await Space.find({
                Location: { $regex: new RegExp(location, 'i') },
                'Guests.Adult': { $gte: guests },
            });

            // Find space IDs with active bookings within the given date range
            const activeBookingSpaceIds = await Booking.find(
                {
                    startDate: { $lte: checkOut },
                    endDate: { $gte: checkIn },
                    isCancelled: false,
                },
                'spaceID'
            ).distinct('spaceID');

            // Filter out spaces that have active bookings within the specified date range
            const spaces = allSpaces.filter(space => !activeBookingSpaceIds.includes(space._id));
            console.log("searched spaces", spaces);
            res.status(200).json(spaces);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while searching for spaces.' });
        }
    }),

    cancelBooking: asyncHandler(async (req, res) => {
        try {
            const bookingId = req.params.bookingId;
            const booking = await Booking.findById(bookingId);

            if (booking) {
                booking.isCancelled = true; // Set isCancelled to true
                const updatedBooking = await booking.save();
                res.status(200).json(updatedBooking);
            } else {
                res.status(404).json({ message: 'Booking not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error cancelling booking', error });
        }
    }),


    createReview: asyncHandler(async (req, res) => {
        try {
            const newReview = new Review({
                spaceID: req.body.spaceID,
                userID: req.body.userID,
                rating: req.body.rating,
                comment: req.body.comment,
                userName: req.body.userName,
                createdAt: new Date()
            });

            const savedReview = await newReview.save();

            res.status(201).json(savedReview);
        } catch (error) {
            res.status(500).json({ message: 'Error creating review', error });
        }
    }),



    getReviews: asyncHandler(async (req, res) => {
        try {
            const { spaceid } = req.body;

            const reviews = await Review.find({
                spaceID: spaceid,
            }) // replace 'name' with the actual field for user's name in your User model

            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching reviews', error });
        }
    }),

    getUser: asyncHandler(async (req, res) => {
        try {
            const user = await User.findById(req.params.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    }),

    updateUser: asyncHandler(async (req, res) => {
        try {
            const { name, email, Address, City, State, Pincode } = req.body;
            const user = await User.findById(req.params.userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.name = name;
            user.email = email;
            user.Address = Address;
            user.City = City;
            user.State = State;
            user.Zipcode = Pincode;

            await user.save();

            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    }),


    getForgotPasswordLink: (async (req, res) => {

        const { email } = req.body;
    
        try {
          const oldUser = await User.findOne({ email });
          if (!oldUser) {
            return res.status(404).json({ status: "User Not Exists!!" });
          }
          const token = await generateToken(oldUser._id)
          const link = `http://orcube.xyz/changepassword/${oldUser._id}/${token}`;
    
          var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "abhy.r010@gmail.com",
              pass: "vrphagtstthsdtda",
            },
          });
    
          let info = await transporter.sendMail({
            from: 'abhy.r010@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Password Reset for Orcube", // Subject line
            html: `<p>Hi there,</p>
                   <p>You have requested to reset your password for Lounge. Please click on the following link to reset your password:</p>
                   <a href="${link}">${link}</a>
                   <p>If you did not make this request, please ignore this email.</p>
                   <p>Best regards,</p>
                   <p>Orcube</p>`, // html body
          });
    
          if (info) {
            res.status(201).json({ message: "Link Sent" })
          }
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
    
        } catch (error) {
          console.log(error.message);
        }
    
      }),

      resetPassword: (async (req, res) => {

        try {
    
          const { email, password } = req.body;
          console.log(password);
          const userData = await User.findOne({ email })
    
          if (!userData) {
            res.status(404).json("Invalid Email")
          } else {
            console.log("11");
            userData.password = bcrypt.hashSync(password, bcryptSalt);
            const user = await userData.save();
            console.log(user);
            if (user) {
              res.status(201).json({ user, host })
            }
          }
    
        } catch (error) {
          console.log(error.message);
        }
    
      }),

}