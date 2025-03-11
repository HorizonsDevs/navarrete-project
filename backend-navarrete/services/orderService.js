const prisma = require('../prismaClient');

// 🟢 Get all orders (Admins only)
exports.getAllOrders = async () => {
    return await prisma.order.findMany({
        include: { items: true, customer: true }
    });
};

// 🔵 Get orders by Seller ID
exports.getOrdersBySeller = async (sellerId) => {
    return await prisma.order.findMany({
        where: { sellerId },
        include: { items: true }
    });
};

// 🔵 Get single order by ID
exports.getOrderById = async (orderId) => {
    return await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true, customer: true }
    });
};

// 🟢 Create a new order
exports.createOrder = async ({ customerId, totalPrice, stripePaymentIntentId, status, items }) => {
    return await prisma.order.create({
        data: {
            customerId,
            total_price: totalPrice,
            stripe_payment_intent_id: stripePaymentIntentId,
            status,
            items: { create: items }
        }
    });
};

// 🟠 Update order status
exports.updateOrderStatus = async (orderId, status) => {
    return await prisma.order.update({
        where: { id: orderId },
        data: { status }
    });
};

// 🔴 Delete an order
exports.deleteOrder = async (orderId) => {
    return await prisma.order.delete({
        where: { id: orderId }
    });
};

// 🔄 Mark order as refunded
exports.markOrderAsRefunded = async (orderId, stripeRefundId) => {
    return await prisma.order.update({
        where: { id: orderId },
        data: { status: 'refunded', stripe_refund_id: stripeRefundId }
    });
};
