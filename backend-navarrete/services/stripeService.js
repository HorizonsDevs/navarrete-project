const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const prisma = require('../prismaClient');

// 🟢 Create a Stripe PaymentIntent (Handles both customers & guests)
exports.createPaymentIntent = async (customerId, amount, guestEmail = null) => {
    if (!amount || amount <= 0) {
        throw new Error("Invalid payment amount.");
    }

    let stripeCustomerId = null;

    if (customerId) {
        const user = await prisma.user.findUnique({ where: { id: customerId } });
        if (user && user.stripe_customer_id) {
            stripeCustomerId = user.stripe_customer_id;
        } else {
            throw new Error("Stripe customer not found.");
        }
    } else if (guestEmail) {
        const guestCustomer = await stripe.customers.create({ email: guestEmail });
        stripeCustomerId = guestCustomer.id;
    }

    return await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: 'usd',
        customer: stripeCustomerId,
        receipt_email: guestEmail || null,
    });
};

// 🔵 Get Customer's Payment History
exports.getCustomerPayments = async (stripeCustomerId) => {
    return await stripe.paymentIntents.list({ customer: stripeCustomerId, limit: 10 });
};

// 🔄 Process a Refund (Admins Only)
exports.processRefund = async (paymentIntentId) => {
    return await stripe.refunds.create({ payment_intent: paymentIntentId });
};

// 🟢 Create a Subscription (Customers Only)
exports.createSubscription = async (customerId, priceId) => {
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

// 🔄 Cancel Subscription
exports.cancelSubscription = async (customerId) => {
    const user = await prisma.user.findUnique({ where: { id: customerId } });
    if (!user || !user.stripe_subscription_id) {
        throw new Error("No active subscription found.");
    }

    await stripe.subscriptions.del(user.stripe_subscription_id);
    await prisma.user.update({ where: { id: customerId }, data: { stripe_subscription_id: null } });

    return { message: "Subscription cancelled successfully." };
};

// 🟢 Process Payout for Seller
exports.processPayout = async (sellerId, amount) => {
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
    return await stripe.payouts.list({ limit: 10, destination: stripeAccountId });
};
