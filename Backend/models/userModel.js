const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isHost: {
      type: Boolean,
      required: true,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      required: true,
      default: false,
    },
    isApplied: {
      type:Boolean,
      required: true,
      default: false
    },
    mobile: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true, 
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;