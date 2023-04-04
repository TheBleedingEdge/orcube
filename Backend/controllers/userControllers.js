const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Space = require("../models/SpaceModel")
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
}