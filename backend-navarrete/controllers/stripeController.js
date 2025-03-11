const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripeService = require('../services/stripeService');
const orderService = require('../services/orderService');
const userService = require('../services/userService');

// 🟢 Create a Stripe PaymentIntent for a new order (Customers & Guests)
exports.createPaymentIntent = async (req, res) => {
    try {
        const { customerId, guestEmail, items } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: "Invalid order items." });
        }

        // ✅ Validate product prices & stock before processing payment
        const { totalAmount, validatedItems } = await orderService.validateOrderItems(items);

        const paymentIntent = await stripeService.createPaymentIntent(customerId, totalAmount, guestEmail);

        res.json({ clientSecret: paymentIntent.client_secret, items: validatedItems, totalAmount });
    } catch (error) {
        console.error("❌ Error creating payment intent:", error);
        res.status(500).json({ error: "Error creating payment intent." });
    }
};

// 🟠 Get a Customer's Stripe Payments
exports.getCustomerPayments = async (req, res) => {
    try {
        const payments = await stripeService.getCustomerPayments(req.user.stripe_customer_id);
        res.json(payments);
    } catch (error) {
        console.error("❌ Error fetching payments:", error);
        res.status(500).json({ error: "Error fetching payments." });
    }
};

// 🔄 Process a Refund (Admins Only)
exports.processRefund = async (req, res) => {
    try {
        const { paymentIntentId } = req.body;
        if (!paymentIntentId) {
            return res.status(400).json({ error: "Payment Intent ID is required." });
        }

        const refund = await stripeService.processRefund(paymentIntentId);
        res.json({ message: "Refund processed successfully.", refund });
    } catch (error) {
        console.error("❌ Error processing refund:", error);
        res.status(500).json({ error: "Error processing refund." });
    }
};

// 🟢 Create a Subscription (Customers Only)
exports.createSubscription = async (req, res) => {
    try {
        const { priceId } = req.body;
        if (!priceId) {
            return res.status(400).json({ error: "Price ID is required." });
        }

        const subscription = await stripeService.createSubscription(req.user.id, priceId);
        res.json(subscription);
    } catch (error) {
        console.error("❌ Error creating subscription:", error);
        res.status(500).json({ error: "Error creating subscription." });
    }
};

// 🔵 Get Subscription Details
exports.getSubscription = async (req, res) => {
    try {
        const subscription = await stripeService.getSubscription(req.user.stripe_subscription_id);
        res.json(subscription);
    } catch (error) {
        console.error("❌ Error fetching subscription:", error);
        res.status(500).json({ error: "Error fetching subscription." });
    }
};

// 🔄 Cancel a Subscription (Customers Only)
exports.cancelSubscription = async (req, res) => {
    try {
        await stripeService.cancelSubscription(req.user.id);
        res.json({ message: "Subscription cancelled successfully." });
    } catch (error) {
        console.error("❌ Error cancelling subscription:", error);
        res.status(500).json({ error: "Error cancelling subscription." });
    }
};

// 🟢 Process Payout for Seller (Sellers Only)
exports.processPayout = async (req, res) => {
    try {
        const { amount } = req.body;
        await stripeService.processPayout(req.user.id, amount);
        res.json({ message: "Payout processed successfully." });
    } catch (error) {
        console.error("❌ Error processing payout:", error);
        res.status(500).json({ error: "Error processing payout." });
    }
};

// 🔵 Get Seller Payouts (Sellers Only)
exports.getSellerPayouts = async (req, res) => {
    try {
        const payouts = await stripeService.getSellerPayouts(req.user.stripe_account_id);
        res.json(payouts);
    } catch (error) {
        console.error("❌ Error fetching payouts:", error);
        res.status(500).json({ error: "Error fetching payouts." });
    }
};
