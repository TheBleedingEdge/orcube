const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
    {
        spaceID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Space',
            required: true,
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        userName: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: () => new Date(),
        },
    }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
