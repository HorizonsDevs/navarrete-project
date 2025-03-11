const orderService = require('../services/orderService');

// 🟢 Get all orders (Seller & Admin)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    } catch (error) {
        console.error("❌ Error fetching orders:", error);
        res.status(500).json({ error: "Failed to retrieve orders." });
    }
};

// 🔵 Get order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        if (!order) return res.status(404).json({ error: "Order not found." });

        res.json(order);
    } catch (error) {
        console.error("❌ Error fetching order:", error);
        res.status(500).json({ error: "Failed to retrieve order." });
    }
};

// 🟢 Create an order (Customers Only)
exports.createOrder = async (req, res) => {
    try {
        const { customerId, items } = req.body;

        if (!customerId || !items || items.length === 0) {
            return res.status(400).json({ error: "Invalid order request." });
        }

        const newOrder = await orderService.createOrder({
            customerId,
            items
        });

        res.status(201).json(newOrder);
    } catch (error) {
        console.error("❌ Error creating order:", error);
        res.status(500).json({ error: "Failed to create order." });
    }
};

// 🟠 Update order status (Seller & Admin)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedOrder = await orderService.updateOrderStatus(req.params.id, status);

        res.json(updatedOrder);
    } catch (error) {
        console.error("❌ Error updating order status:", error);
        res.status(500).json({ error: "Failed to update order status." });
    }
};

// 🔴 Delete order (Seller & Admin)
exports.deleteOrder = async (req, res) => {
    try {
        await orderService.deleteOrder(req.params.id);
        res.json({ message: "Order deleted successfully." });
    } catch (error) {
        console.error("❌ Error deleting order:", error);
        res.status(500).json({ error: "Failed to delete order." });
    }
};

// 🔄 Refund order (Seller & Admin)
exports.markOrderAsRefunded = async (req, res) => {
    try {
        const updatedOrder = await orderService.markOrderAsRefunded(req.params.id);

        res.json(updatedOrder);
    } catch (error) {
        console.error("❌ Error processing refund:", error);
        res.status(500).json({ error: "Failed to process refund." });
    }
};
