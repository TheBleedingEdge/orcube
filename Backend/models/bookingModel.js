const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        space: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'spaces',
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
            required: true,
            default: false,
        },
        payment_status: {
            type: Boolean,
            required: true,
            default: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
