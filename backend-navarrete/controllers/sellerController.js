const sellerService = require('../services/sellerService');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// 🟢 Get all sellers (Admins Only)
exports.getAllSellers = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: "Only admins can view all sellers." });
        }

        const sellers = await sellerService.getAllSellers();
        res.json(sellers);
    } catch (error) {
        console.error("Error fetching sellers:", error);
        res.status(500).json({ error: "Error fetching sellers." });
    }
};

// 🔵 Get seller details by ID (Only Admins or the seller themselves)
exports.getSellerById = async (req, res) => {
    try {
        const seller = await sellerService.getSellerById(req.params.id);
        if (!seller) return res.status(404).json({ error: "Seller not found." });

        if (req.user.role !== 'admin' && req.user.id !== seller.id) {
            return res.status(403).json({ error: "Unauthorized to view this seller profile." });
        }

        res.json(seller);
    } catch (error) {
        console.error("Error fetching seller:", error);
        res.status(500).json({ error: "Error fetching seller details." });
    }
};

// 🟢 Seller Onboarding with Stripe Connect
exports.connectStripe = async (req, res) => {
    try {
        if (req.user.role !== 'seller') {
            return res.status(403).json({ error: "Only sellers can connect to Stripe." });
        }

        if (!req.user.stripe_account_id) {
            const stripeAccount = await stripe.accounts.create({
                type: 'express',
                email: req.user.email,
            });

            await sellerService.updateSellerStripeAccount(req.user.id, stripeAccount.id);
            req.user.stripe_account_id = stripeAccount.id;
        }

        const stripeAccountLink = await stripe.accountLinks.create({
            account: req.user.stripe_account_id,
            refresh_url: process.env.FRONTEND_URL + '/dashboard',
            return_url: process.env.FRONTEND_URL + '/dashboard',
            type: 'account_onboarding',
        });

        res.json({ url: stripeAccountLink.url });
    } catch (error) {
        console.error("Error connecting to Stripe:", error);
        res.status(500).json({ error: "Error connecting to Stripe." });
    }
};

// 🟢 Get Seller Products
exports.getSellerProducts = async (req, res) => {
    try {
        if (req.user.role !== 'seller') {
            return res.status(403).json({ error: "Only sellers can access their products." });
        }

        const products = await sellerService.getSellerProducts(req.user.id);
        res.json(products);
    } catch (error) {
        console.error("Error fetching seller products:", error);
        res.status(500).json({ error: "Error fetching products." });
    }
};

// 🔵 Get Seller Orders
exports.getSellerOrders = async (req, res) => {
    try {
        if (req.user.role !== 'seller') {
            return res.status(403).json({ error: "Only sellers can access their orders." });
        }

        const orders = await sellerService.getSellerOrders(req.user.id);
        res.json(orders);
    } catch (error) {
        console.error("Error fetching seller orders:", error);
        res.status(500).json({ error: "Error fetching orders." });
    }
};

// 🟢 Process Payout to Seller
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
            amount: Math.round(amount * 100), // Convert to cents
            currency: 'usd',
            destination: req.user.stripe_account_id,
        });

        res.json({ message: "Payout processed successfully." });
    } catch (error) {
        console.error("Error processing payout:", error);
        res.status(500).json({ error: "Error processing payout." });
    }
};

// 🔴 Delete a Seller (Admin Only)
exports.deleteSeller = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: "Only admins can delete sellers." });
        }

        const seller = await sellerService.getSellerById(req.params.id);
        if (!seller) return res.status(404).json({ error: "Seller not found." });

        await sellerService.deleteSeller(req.params.id);
        res.json({ message: "Seller deleted successfully." });
    } catch (error) {
        console.error("Error deleting seller:", error);
        res.status(500).json({ error: "Error deleting seller." });
    }
};
