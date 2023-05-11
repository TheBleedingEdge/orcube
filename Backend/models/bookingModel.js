const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        spaceID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Space',
            required: true,
        },
        HostID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        numberOfAdults: {
            type: Number,
            required: true,
        },
        numberOfChildren: {
            type: Number,
            required: true,
        },
        numberOfPets: {
            type: Number,
            required: true,
        },
        totalCost: {
            type: Number,
            required: true,
        },
        isCancelled: {
            type: Boolean,
            default: false,
        },
        bookingApproved: {
            type: Boolean,
            required: true,
            default: false,
        },
        createdAt: {
            type: Date,
            default: () => new Date(),
        },
    }
);


const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
