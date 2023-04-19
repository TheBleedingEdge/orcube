const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Space = require("../models/SpaceModel")

module.exports = {
    getUsers: asyncHandler(async (req, res) => {
        try {
            const userdocs = await User.find();
            res.json(userdocs)
        } catch (error) {
            console.log(error);
        }
    }),

    changeStatus: asyncHandler(async (req, res) => {
        try {
            console.log(req.params.id);
            const user = await User.findById(req.params.id)
            if (user.isBlocked === true) {
                user.isBlocked = false;
                await user.save();
                res.json(user)
            } else {
                user.isBlocked = true;
                await user.save();
                res.json(user)
            }
        } catch (error) {
            console.log(error);
        }
    }),



    getToApproveSpace: asyncHandler(async (req, res) => {
        try {
            const spacedocs = await Space.find({isApproved: false});
            res.json(spacedocs)
        } catch (error) {
            console.log(error);
        }
    }),

    changeSpaceStatus: asyncHandler(async (req, res) => {
        try {
            const space = await Space.findById(req.params.id)
            if (space.isApproved === true) {
                space.isApproved = false;
                await space.save();
                res.json(space)
            } else {
                space.isApproved = true;
                await space.save();
                res.json(space)
            }
        } catch (error) {
            console.log(error);
        }
    }),
}