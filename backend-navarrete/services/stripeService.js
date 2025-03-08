const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const prisma = require('../prismaClient'); // Prisma ORM

// 🟢 Create a Stripe PaymentIntent (Customers Only)
exports.createPaymentIntent = async (customerId, amount) => {
    if (!amount || amount <= 0) {
        throw new Error("Invalid payment amount.");
    }

    const user = await prisma.user.findUnique({ where: { id: customerId } });

    if (!user || !user.stripe_customer_id) {
        throw new Error("Stripe customer not found.");
    }

    return await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: 'usd',
        customer: user.stripe_customer_id,
    });
};

// 🔵 Get Customer's Payment History
exports.getCustomerPayments = async (stripeCustomerId) => {
    if (!stripeCustomerId) {
        throw new Error("Stripe customer ID is required.");
    }

    return await stripe.paymentIntents.list({
        customer: stripeCustomerId,
        limit: 10
    });
};

// 🔄 Process a Refund (Admins Only)
exports.processRefund = async (paymentIntentId) => {
    if (!paymentIntentId) {
        throw new Error("Payment Intent ID is required.");
    }

    return await stripe.refunds.create({
        payment_intent: paymentIntentId
    });
};

// 🟢 Create a Subscription (Customers Only)
exports.createSubscription = async (customerId, priceId) => {
    if (!priceId) {
        throw new Error("Price ID is required.");
    }

    const user = await prisma.user.findUnique({ where: { id: customerId } });

    if (!user || !user.stripe_customer_id) {
        throw new Error("Stripe customer not found.");
    }

    const subscription = await stripe.subscriptions.create({
        customer: user.stripe_customer_id,
        items: [{ price: priceId }],
        expand: ['latest_invoice.payment_intent'],
    });

    await prisma.user.update({
        where: { id: customerId },
        data: { stripe_subscription_id: subscription.id }
    });

    return subscription;
};

// 🔵 Get Subscription Details
exports.getSubscription = async (stripeSubscriptionId) => {
    if (!stripeSubscriptionId) {
        throw new Error("Stripe subscription ID is required.");
    }

    return await stripe.subscriptions.retrieve(stripeSubscriptionId);
};

// 🔄 Cancel Subscription (Customers Only)
exports.cancelSubscription = async (customerId) => {
    const user = await prisma.user.findUnique({ where: { id: customerId } });

    if (!user || !user.stripe_subscription_id) {
        throw new Error("No active subscription found.");
    }

    await stripe.subscriptions.del(user.stripe_subscription_id);

    await prisma.user.update({
        where: { id: customerId },
        data: { stripe_subscription_id: null }
    });

    return { message: "Subscription cancelled successfully." };
};

// 🟢 Create Stripe Connect Account for Seller
exports.createStripeAccount = async (sellerId, email) => {
    const stripeAccount = await stripe.accounts.create({
        type: 'express',
        email
    });

    await prisma.user.update({
        where: { id: sellerId },
        data: { stripe_account_id: stripeAccount.id }
    });

    return stripeAccount;
};

// 🔵 Get Stripe Connect Onboarding Link
exports.getStripeOnboardingLink = async (stripeAccountId) => {
    if (!stripeAccountId) {
        throw new Error("Stripe account ID is required.");
    }

    return await stripe.accountLinks.create({
        account: stripeAccountId,
        refresh_url: process.env.FRONTEND_URL + '/dashboard',
        return_url: process.env.FRONTEND_URL + '/dashboard',
        type: 'account_onboarding',
    });
};

// 🟢 Process Payout for Seller
exports.processPayout = async (sellerId, amount) => {
    if (!amount || amount <= 0) {
        throw new Error("Invalid payout amount.");
    }

    const user = await prisma.user.findUnique({ where: { id: sellerId } });

    if (!user || !user.stripe_account_id) {
        throw new Error("Seller is not connected to Stripe.");
    }

    return await stripe.transfers.create({
        amount: Math.round(amount * 100),
        currency: 'usd',
        destination: user.stripe_account_id,
    });
};

// 🔵 Get Seller Payouts
exports.getSellerPayouts = async (stripeAccountId) => {
    if (!stripeAccountId) {
        throw new Error("Stripe account ID is required.");
    }

    return await stripe.payouts.list({
        limit: 10,
        destination: stripeAccountId
    });
};
