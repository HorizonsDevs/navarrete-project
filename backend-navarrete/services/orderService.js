const prisma = require('../prismaClient');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// 🟢 Get all orders (Admin & Seller)
exports.getAllOrders = async () => {
    return await prisma.order.findMany({
        include: {
            items: { include: { product: true } },
            customer: true
        }
    });
};

// 🔵 Get order by ID
exports.getOrderById = async (orderId) => {
    return await prisma.order.findUnique({
        where: { id: orderId },
        include: {
            items: { include: { product: true } },
            customer: true
        }
    });
};

// 🟢 Create an order with Stripe payment (Customers Only)

// 🟢 Create a new order
exports.createOrder = async ({ customerId, items }) => {
    try {
        console.log("🟢 Creating order for customer:", customerId);
        console.log("🟢 Items requested:", items);

        // ✅ Step 1: Validate & Fetch Product Prices from DB
        let totalPrice = 0;
        let orderItems = [];

        for (const item of items) {
            const product = await prisma.product.findUnique({
                where: { id: item.productId }
            });

            if (!product) {
                console.error(`❌ Product not found: ${item.productId}`);
                throw new Error(`Product not found: ${item.productId}`);
            }

            // ✅ Ensure sufficient stock
            if (product.stock_quantity < item.quantity) {
                console.error(`❌ Not enough stock for: ${product.name}`);
                throw new Error(`Not enough stock for: ${product.name}`);
            }

            // ✅ Use price from DB, not user input
            const productTotal = product.price * item.quantity;
            totalPrice += productTotal;

            orderItems.push({
                product_id: product.id,
                quantity: item.quantity,
                price: product.price, // ✅ Ensuring database price is used
            });

            console.log(`✅ Added ${item.quantity}x ${product.name} to order.`);
        }

        console.log("🟢 Calculated Total Price:", totalPrice);

        // ✅ Step 2: Create Stripe PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(totalPrice * 100), // Convert to cents
            currency: 'usd',
            customer: customerId,
        });

        console.log("✅ Stripe PaymentIntent Created:", paymentIntent.id);

        // ✅ Step 3: Create Order in Database
        const newOrder = await prisma.order.create({
            data: {
                customer_id: customerId,
                total_price: totalPrice,
                stripe_payment_intent_id: paymentIntent.id,
                status: 'pending',
                items: { create: orderItems },
            },
            include: { items: true },
        });

        console.log("🟢 Order Created Successfully:", newOrder.id);

        // ✅ Step 4: Update Stock Levels
        for (const item of orderItems) {
            await prisma.product.update({
                where: { id: item.product_id },
                data: { stock_quantity: { decrement: item.quantity } }, // Deduct stock
            });
        }

        console.log("🟢 Stock Updated Successfully.");

        return newOrder;
    } catch (error) {
        console.error("❌ Error creating order:", error);
        throw new Error("Failed to create order.");
    }
};


// 🟠 Update order status (Seller & Admin)
exports.updateOrderStatus = async (orderId, status) => {
    return await prisma.order.update({
        where: { id: orderId },
        data: { status }
    });
};

// 🔴 Delete order (Seller & Admin)
exports.deleteOrder = async (orderId) => {
    return await prisma.order.delete({
        where: { id: orderId }
    });
};

// 🔄 Refund an order (Seller & Admin)
exports.markOrderAsRefunded = async (orderId) => {
    const order = await prisma.order.findUnique({
        where: { id: orderId }
    });

    if (!order || !order.stripe_payment_intent_id) {
        throw new Error("Order not found or missing Stripe Payment Intent.");
    }

    // ✅ Step 1: Process Stripe Refund
    const refund = await stripe.refunds.create({
        payment_intent: order.stripe_payment_intent_id,
    });

    console.log("✅ Stripe Refund Processed:", refund.id);

    // ✅ Step 2: Update Order in Database
    return await prisma.order.update({
        where: { id: orderId },
        data: {
            status: 'refunded',
            stripe_refund_id: refund.id
        }
    });
};
