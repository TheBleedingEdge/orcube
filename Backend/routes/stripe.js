const express = require('express');
const Stripe = require('stripe')
const Booking = require('../models/bookingModel')
const rateLimit = require('express-rate-limit');

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY)

const router = express.Router()

const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 1, // limit each IP to 1 request per windowMs
    message: 'Too many requests, please try again later.',
});


let tempsession;

//https://buy.stripe.com/test_3cscOigMhbFw4sE289

router.post('/create-checkout-session', async (req, res) => {
    const BookingDetails = req.body

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'INR',
                    product_data: {
                        name: BookingDetails.cardData.Title,
                    },
                    unit_amount: BookingDetails.Total,
                    currency: "INR"
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/user/checkout_success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: 'http://localhost:5000/cancel',
    });
    res.send({ url: session.url });
});



// server.js or a separate router file
router.post('/verify-session',apiLimiter, async (req, res) => {
    const { sessionId, storedObj } = req.body;

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Verify that the session is valid and has the expected properties, e.g., payment status
        if (session && session.payment_status === 'paid') {

            const post = await Booking.create({
                userID: storedObj.userInfo._id,
                spaceID: storedObj.spaceid,
                startDate: storedObj.firstDate,
                endDate: storedObj.secondDate,
                numberOfAdults: storedObj.countAdult,
                numberOfChildren: storedObj.countChildren,
                numberOfPets: storedObj.countPets,
                totalCost: storedObj.Total,
            });

            const savedPost = await post.save();
            res.json({ success: true, message: 'Session is valid' });
        } else {
            res.status(400).json({ success: false, message: 'Invalid session' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Failed to verify session', error });
    }
});

module.exports = router;