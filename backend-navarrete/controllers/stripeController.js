const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const orderService = require('../services/orderService');
const userService = require('../services/userService');

// 🟢 Create a Stripe PaymentIntent for a new order
exports.createPaymentIntent = async (req, res) => {
    try {
        if (req.user.role !== 'customer') {
            return res.status(403).json({ error: "Only customers can create payments." });
        }

        const { amount } = req.body;
        if (!amount || amount <= 0) {
            return res.status(400).json({ error: "Invalid payment amount." });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: 'usd',
            customer: req.user.stripe_customer_id,
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ error: "Error creating payment intent." });
    }
};

// 🟠 Get a Customer's Stripe Payments
exports.getCustomerPayments = async (req, res) => {
    try {
        if (req.user.role !== 'customer') {
            return res.status(403).json({ error: "Unauthorized to access payments." });
        }

        const payments = await stripe.paymentIntents.list({
            customer: req.user.stripe_customer_id,
            limit: 10
        });

        res.json(payments);
    } catch (error) {
        console.error("Error fetching payments:", error);
        res.status(500).json({ error: "Error fetching payments." });
    }
};

// 🔄 Process a Refund (Admins Only)
exports.processRefund = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: "Only admins can process refunds." });
        }

        const { paymentIntentId } = req.body;
        if (!paymentIntentId) {
            return res.status(400).json({ error: "Payment Intent ID is required." });
        }

        const refund = await stripe.refunds.create({ payment_intent: paymentIntentId });

        res.json({ message: "Refund processed successfully.", refund });
    } catch (error) {
        console.error("Error processing refund:", error);
        res.status(500).json({ error: "Error processing refund." });
    }
};

// 🟢 Create a Subscription (Customers Only)
exports.createSubscription = async (req, res) => {
    try {
        if (req.user.role !== 'customer') {
            return res.status(403).json({ error: "Only customers can subscribe." });
        }

        const { priceId } = req.body;
        if (!priceId) {
            return res.status(400).json({ error: "Price ID is required." });
        }

        const subscription = await stripe.subscriptions.create({
            customer: req.user.stripe_customer_id,
            items: [{ price: priceId }],
            expand: ['latest_invoice.payment_intent'],
        });

        await userService.updateSubscription(req.user.id, subscription.id);

        res.json(subscription);
    } catch (error) {
        console.error("Error creating subscription:", error);
        res.status(500).json({ error: "Error creating subscription." });
    }
};

// 🔵 Get Subscription Details (Customers Only)
exports.getSubscription = async (req, res) => {
    try {
        if (req.user.role !== 'customer') {
            return res.status(403).json({ error: "Unauthorized to access subscription." });
        }

        if (!req.user.stripe_subscription_id) {
            return res.status(404).json({ error: "No active subscription found." });
        }

        const subscription = await stripe.subscriptions.retrieve(req.user.stripe_subscription_id);
        res.json(subscription);
    } catch (error) {
        console.error("Error fetching subscription:", error);
        res.status(500).json({ error: "Error fetching subscription." });
    }
};

// 🔄 Cancel a Subscription (Customers Only)
exports.cancelSubscription = async (req, res) => {
    try {
        if (req.user.role !== 'customer') {
            return res.status(403).json({ error: "Unauthorized to cancel subscription." });
        }

        if (!req.user.stripe_subscription_id) {
            return res.status(404).json({ error: "No active subscription found." });
        }

        await stripe.subscriptions.del(req.user.stripe_subscription_id);
        await userService.updateSubscription(req.user.id, null);

        res.json({ message: "Subscription cancelled successfully." });
    } catch (error) {
        console.error("Error cancelling subscription:", error);
        res.status(500).json({ error: "Error cancelling subscription." });
    }
};

// 🟢 Process Payout for Seller (Sellers Only)
exports.processPayout = async (req, res) => {
    try {
        if (req.user.role !== 'seller') {
            return res.status(403).json({ error: "Only sellers can request payouts." });
        }

        if (!req.user.stripe_account_id) {
            return res.status(400).json({ error: "Seller is not connected to Stripe." });
        }

        const { amount } = req.body;
        if (!amount || amount <= 0) {
            return res.status(400).json({ error: "Invalid payout amount." });
        }

        await stripe.transfers.create({
            amount: Math.round(amount * 100),
            currency: 'usd',
            destination: req.user.stripe_account_id,
        });

        res.json({ message: "Payout processed successfully." });
    } catch (error) {
        console.error("Error processing payout:", error);
        res.status(500).json({ error: "Error processing payout." });
    }
};

// 🔵 Get Seller Payouts (Sellers Only)
exports.getSellerPayouts = async (req, res) => {
    try {
        if (req.user.role !== 'seller') {
            return res.status(403).json({ error: "Unauthorized to access payouts." });
        }

        if (!req.user.stripe_account_id) {
            return res.status(400).json({ error: "Seller is not connected to Stripe." });
        }

        const payouts = await stripe.payouts.list({
            limit: 10,
            destination: req.user.stripe_account_id
        });

        res.json(payouts);
    } catch (error) {
        console.error("Error fetching payouts:", error);
        res.status(500).json({ error: "Error fetching payouts." });
    }
};