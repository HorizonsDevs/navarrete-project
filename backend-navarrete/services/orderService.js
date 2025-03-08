const prisma = require('../prismaClient');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// 🟢 Get all orders (Admin Only)
exports.getAllOrders = async () => {
    return await prisma.order.findMany({
        include: { items: true, customer: true }
    });
};

// 🔵 Get order by ID
exports.getOrderById = async (orderId) => {
    return await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true, customer: true }
    });
};

// 🔵 Get orders by seller (Sellers Only)
exports.getOrdersBySeller = async (sellerId) => {
    return await prisma.order.findMany({
        where: {
            items: {
                some: { product: { sellerId } }
            }
        },
        include: { items: true, customer: true }
    });
};

// 🟢 Create order & process Stripe payment
exports.createOrder = async ({ customerId, totalPrice, stripePaymentIntentId, status, items }) => {
    return await prisma.order.create({
        data: {
            customerId,
            totalPrice,
            stripe_payment_intent_id: stripePaymentIntentId,
            status,
            items: {
                create: items.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price
                }))
            }
        },
        include: { items: true }
    });
};

// 🟠 Update order details
exports.updateOrder = async (orderId, data) => {
    return await prisma.order.update({
        where: { id: orderId },
        data
    });
};

// 🔴 Delete order (Admin Only)
exports.deleteOrder = async (orderId) => {
    return await prisma.order.delete({
        where: { id: orderId }
    });
};

// 🔄 Update order status (Admins & Sellers)
exports.updateOrderStatus = async (orderId, status) => {
    return await prisma.order.update({
        where: { id: orderId },
        data: { status }
    });
};

// 🔄 Mark order as refunded
exports.markOrderAsRefunded = async (orderId, refundId) => {
    return await prisma.order.update({
        where: { id: orderId },
        data: {
            stripe_refund_id: refundId,
            status: "refunded"
        }
    });
};
