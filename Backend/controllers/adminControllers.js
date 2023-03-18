const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

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
    })
}