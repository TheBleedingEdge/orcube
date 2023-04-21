const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Space = require("../models/SpaceModel")
const Booking = require("../models/bookingModel")
const generateToken = require("../util/generateToken");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


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
            const spacedocs = await Space.find({isApproved: true});
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

    
    checkAvailability : asyncHandler(async (req, res) => {
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

    getbookingDetails: asyncHandler(async(req,res)=>{
        const { userInfo } = req.body;

        try {
            console.log(userInfo);
            const bookingData = await Booking.find({userID:userInfo._id}).populate('spaceID')
            if(bookingData){
                res.status(200).json(bookingData)
            }else{
                res.status(500).json({message: 'Error occured while fetching Booking Data'})
            }
        } catch (error) {
            console.error(error);
        }
    })
}