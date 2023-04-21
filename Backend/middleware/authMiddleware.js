const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

module.exports = {
  protect : asyncHandler(async (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        console.log("Toek here",token);

        //decodes token id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password");

        next();
      } catch (error) {
        res.status(401);
        throw new Error(error);
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }),

  protectAdmin : asyncHandler(async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized, requires admin role");
    }
  }),

  protectHost : asyncHandler(async (req, res, next) => {
    if (req.user && req.user.isHost) {
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized, requires host role");
    }
  }),

  protectUser : asyncHandler(async (req, res, next) => {
    if (req.user && (!req.user.isAdmin && !req.user.isHost)) {
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized, requires user role");
    }
  })
};
