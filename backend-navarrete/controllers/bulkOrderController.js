const bulkOrderService = require('../services/bulkOrderService');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// 🟢 Get all bulk orders (Admins Only)
exports.getAllBulkOrders = async (req, res) => {
    try {
        const bulkOrders = await bulkOrderService.getAllBulkOrders();
        res.json(bulkOrders);
    } catch (error) {
        console.error("Error fetching bulk orders:", error);
        res.status(500).json({ error: "Error fetching bulk orders." });
    }
};

// 🔵 Get a single bulk order (Admins or Customer who made the request)
exports.getBulkOrderById = async (req, res) => {
    try {
        const bulkOrder = await bulkOrderService.getBulkOrderById(req.params.id);
        if (!bulkOrder) return res.status(404).json({ error: "Bulk order not found." });

        res.json(bulkOrder);
    } catch (error) {
        console.error("Error fetching bulk order:", error);
        res.status(500).json({ error: "Error fetching bulk order." });
    }
};

// 🟢 Request a bulk order (Customers Only)
exports.createBulkOrder = async (req, res) => {
    try {
        const { details, amount } = req.body;
        if (!details || !amount) {
            return res.status(400).json({ error: "Order details and amount are required." });
        }

        const bulkOrder = await bulkOrderService.createBulkOrder({
            customerId: req.user.id,
            details,
            amount,
            status: "pending" // Initially pending approval
        });

        res.status(201).json(bulkOrder);
    } catch (error) {
        console.error("Error creating bulk order:", error);
        res.status(500).json({ error: "Error creating bulk order." });
    }
};

// 🟠 Approve Bulk Order & Generate Stripe Payment Link (Admins Only)
exports.approveBulkOrder = async (req, res) => {
    try {
        const bulkOrder = await bulkOrderService.getBulkOrderById(req.params.id);
        if (!bulkOrder) return res.status(404).json({ error: "Bulk order not found." });

        // Create a Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: bulkOrder.customer.email,
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: { name: `Bulk Order - ${bulkOrder.details}` },
                    unit_amount: Math.round(bulkOrder.amount * 100), // Convert to cents
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/bulk-order-success?orderId=${bulkOrder.id}`,
            cancel_url: `${process.env.FRONTEND_URL}/bulk-orders`,
        });

        // Update bulk order with Stripe session details
        const updatedBulkOrder = await bulkOrderService.updateBulkOrder(req.params.id, {
            status: "approved",
            stripe_payment_link: session.url
        });

        res.json({ message: "Bulk order approved, Stripe payment link generated.", paymentUrl: session.url });
    } catch (error) {
        console.error("Error approving bulk order:", error);
        res.status(500).json({ error: "Error approving bulk order." });
    }
};

// 🔄 Mark Bulk Order as Paid (Admins Only)
exports.markBulkOrderAsPaid = async (req, res) => {
    try {
        const updatedBulkOrder = await bulkOrderService.updateBulkOrder(req.params.id, {
            status: "paid"
        });

        res.json({ message: "Bulk order marked as paid." });
    } catch (error) {
        console.error("Error marking bulk order as paid:", error);
        res.status(500).json({ error: "Error marking bulk order as paid." });
    }
};

// 🔴 Delete a bulk order (Admins Only)
exports.deleteBulkOrder = async (req, res) => {
    try {
        const success = await bulkOrderService.deleteBulkOrder(req.params.id);
        if (!success) return res.status(404).json({ error: "Bulk order not found." });

        res.json({ message: "Bulk order deleted successfully." });
    } catch (error) {
        console.error("Error deleting bulk order:", error);
        res.status(500).json({ error: "Error deleting bulk order." });
    }
};
