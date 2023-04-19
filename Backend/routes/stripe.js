const express = require('express');
const Stripe = require('stripe')
const Booking = require('../models/bookingModel')

require("dotenv").config();

const STRIPE_KEY = 'sk_test_51MwQ7VSDFkq5k31rDMeVO9PKU4c47qr42fAxbyc6V7WiR5vNDlX4lFL0q9ctJq5PcaBOLo70VcHDupihhdPzRJ2e00ocA86yDj'

const stripe = Stripe(STRIPE_KEY)

const router = express.Router()

//https://buy.stripe.com/test_3cscOigMhbFw4sE289

router.post('/create-checkout-session', async (req, res) => {
    const BookingDetails = req.body
    console.log('Stripe here');
    console.log(BookingDetails);
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'T-shirt',
                    },
                    unit_amount: 2000,
                    currency: "INR"
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/checkout_success`,
        cancel_url: 'http://localhost:5000/cancel',
    });

    // const post = await Booking.create({
    //     HostId,
    //     Address,
    //     Title,
    //     PicData,
    //     Discription,
    //     Price,
    //     Guests,
    //     Perks,
    //     coordinates: hostcoord,
    //     Location: inputValue
    // });

    // const savedPost = await post.save();
    // res.status(200).json(post)

    res.send({ url: session.url });
});

module.exports = router;