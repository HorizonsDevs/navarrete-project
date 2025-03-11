const orderService = require('../services/orderService');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// 🟢 Get all orders (Admins see all, Sellers see their own)
exports.getAllOrders = async (req, res) => {
    try {
        let orders;

        if (req.user.role === 'admin') {
            orders = await orderService.getAllOrders();
        } else if (req.user.role === 'seller') {
            orders = await orderService.getOrdersBySeller(req.user.id);
        } else {
            return res.status(403).json({ error: "Unauthorized to view orders." });
        }

        res.json(orders);
    } catch (error) {
        console.error("❌ Error fetching orders:", error);
        res.status(500).json({ error: "Error fetching orders." });
    }
};

// 🔵 Get a single order (Admins see any, Sellers see their own)
exports.getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        if (!order) return res.status(404).json({ error: "Order not found." });

        if (req.user.role !== 'admin' && req.user.id !== order.sellerId) {
            return res.status(403).json({ error: "Unauthorized to view this order." });
        }

        res.json(order);
    } catch (error) {
        console.error("❌ Error fetching order:", error);
        res.status(500).json({ error: "Error fetching order." });
    }
};

// 🟢 **Create a new order (Customers Only)**
exports.createOrder = async (req, res) => {
    try {
        if (req.user.role !== 'customer') {
            return res.status(403).json({ error: "Only customers can create orders." });
        }

        const { items, totalPrice, stripePaymentMethodId } = req.body;

        if (!items || !items.length || !totalPrice) {
            return res.status(400).json({ error: "Items and totalPrice are required." });
        }

        // ✅ Create Stripe Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(totalPrice * 100),
            currency: 'usd',
            customer: req.user.stripe_customer_id,
            payment_method: stripePaymentMethodId,
            confirm: true
        });

        // ✅ Save order in the database
        const order = await orderService.createOrder({
            customerId: req.user.id,
            totalPrice,
            stripePaymentIntentId: paymentIntent.id,
            status: 'pending',
            items
        });

        res.status(201).json(order);
    } catch (error) {
        console.error("❌ Error creating order:", error);
        res.status(500).json({ error: "Error creating order." });
    }
};

// 🟠 **Update an order (Admins or Sellers Only)**
exports.updateOrder = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        if (!order) return res.status(404).json({ error: "Order not found." });

        if (req.user.role !== 'admin' && req.user.id !== order.sellerId) {
            return res.status(403).json({ error: "Unauthorized to update this order." });
        }

        const updatedOrder = await orderService.updateOrder(req.params.id, req.body);
        res.json(updatedOrder);
    } catch (error) {
        console.error("❌ Error updating order:", error);
        res.status(500).json({ error: "Error updating order." });
    }
};

// 🔴 **Delete an order (Admins Only)**
exports.deleteOrder = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: "Only admins can delete orders." });
        }

        const success = await orderService.deleteOrder(req.params.id);
        if (!success) return res.status(404).json({ error: "Order not found." });

        res.json({ message: "✅ Order deleted successfully." });
    } catch (error) {
        console.error("❌ Error deleting order:", error);
        res.status(500).json({ error: "Error deleting order." });
    }
};

// 🔄 **Update Order Status (Admins & Sellers Only)**
exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        if (!order) return res.status(404).json({ error: "Order not found." });

        if (req.user.role !== 'admin' && req.user.id !== order.sellerId) {
            return res.status(403).json({ error: "Unauthorized to update order status." });
        }

        const updatedOrder = await orderService.updateOrderStatus(req.params.id, req.body.status);
        res.json(updatedOrder);
    } catch (error) {
        console.error("❌ Error updating order status:", error);
        res.status(500).json({ error: "Error updating order status." });
    }
};

// 💳 **Process a refund (Admins Only)**
exports.processRefund = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: "Only admins can process refunds." });
        }

        const order = await orderService.getOrderById(req.params.id);
        if (!order) return res.status(404).json({ error: "Order not found." });

        if (!order.stripePaymentIntentId) {
            return res.status(400).json({ error: "This order has no Stripe payment to refund." });
        }

        const refund = await stripe.refunds.create({
            payment_intent: order.stripePaymentIntentId
        });

        await orderService.markOrderAsRefunded(req.params.id, refund.id);

        res.json({ message: "✅ Refund processed successfully.", refund });
    } catch (error) {
        console.error("❌ Error processing refund:", error);
        res.status(500).json({ error: "Error processing refund." });
    }
};
