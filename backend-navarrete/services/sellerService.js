const prisma = require('../prismaClient'); // Prisma ORM
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// 🟢 Get all sellers (Admin Only)
exports.getAllSellers = async () => {
    return await prisma.user.findMany({
        where: { role: 'seller' },
        include: { products: true }
    });
};

// 🔵 Get seller by ID
exports.getSellerById = async (sellerId) => {
    return await prisma.user.findUnique({
        where: { id: sellerId, role: 'seller' },
        include: { products: true }
    });
};

// 🟢 Update Seller Stripe Account
exports.updateSellerStripeAccount = async (sellerId, stripeAccountId) => {
    return await prisma.user.update({
        where: { id: sellerId },
        data: { stripe_account_id: stripeAccountId }
    });
};

// 🔵 Get seller products
exports.getSellerProducts = async (sellerId) => {
    return await prisma.product.findMany({
        where: { sellerId },
        include: { orderItems: true }
    });
};

// 🔵 Get seller orders
exports.getSellerOrders = async (sellerId) => {
    return await prisma.order.findMany({
        where: {
            items: {
                some: { product: { sellerId } }
            }
        },
        include: { items: true, customer: true }
    });
};

// 🔴 Delete a seller (Admin Only)
exports.deleteSeller = async (sellerId) => {
    return await prisma.user.delete({
        where: { id: sellerId, role: 'seller' }
    });
};
