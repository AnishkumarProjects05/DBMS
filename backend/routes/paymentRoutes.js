const express = require('express');

require('dotenv').config();
const router = express.Router();
console.log('Payment Routes Loaded');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);




router.post('/create-payment', async (req, res) => {
    const { amount } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method_types: ['card']
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
        
        console.log('Payment Successfully done');
    } catch (error) {
        return res.status(500).json({ message: 'Payment creation failed', error: error.message });
    }
});

module.exports = router;
