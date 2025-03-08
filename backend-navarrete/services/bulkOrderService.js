const prisma = require('../prismaClient');
const bulkOrderService = require('../services/bulkOrderService');


// 🟢 Get all bulk orders (Admin Only)
exports.getAllBulkOrders = async () => {
    return await prisma.bulk_order.findMany({
        include: { customer: true }
    });
};

// 🔵 Get bulk order by ID
exports.getBulkOrderById = async (bulkOrderId) => {
    return await prisma.bulk_order.findUnique({
        where: { id: bulkOrderId },
        include: { customer: true }
    });
};

// 🟢 Create a new bulk order request
exports.createBulkOrder = async ({ customerId, details, amount, status }) => {
    return await prisma.bulk_order.create({
        data: {
            customerId,
            details,
            amount,
            status
        }
    });
};

// 🟠 Update bulk order status (Approval, Payment Link, Mark as Paid)
exports.updateBulkOrder = async (req, res) => {
    try {
        const updatedBulkOrder = await bulkOrderService.updateBulkOrder(req.params.id, req.body);
        if (!updatedBulkOrder) {
            return res.status(404).json({ error: "Bulk order not found" });
        }
        res.json(updatedBulkOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update bulk order" });
    }
};

// 🔴 Delete bulk order (Admin Only)
exports.deleteBulkOrder = async (bulkOrderId) => {
    return await prisma.bulk_order.delete({
        where: { id: bulkOrderId }
    });
};
