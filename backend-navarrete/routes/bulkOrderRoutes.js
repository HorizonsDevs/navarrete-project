const express = require('express');
const router = express.Router();
const bulkOrderController = require('../controllers/bulkOrderController'); // Ensure correct import
const { protect, adminOnly } = require('../middlewares/authMiddleware'); // Add authentication middleware

// 🟢 Get all bulk orders (Admin Only)
router.get('/', protect, adminOnly, bulkOrderController.getAllBulkOrders);

// 🔵 Get a bulk order by ID (Admins or customer who made the request)
router.get('/:id', protect, bulkOrderController.getBulkOrderById);

// 🟢 Create a new bulk order request (Customers Only)
router.post('/', protect, bulkOrderController.createBulkOrder);

// 🟠 Approve a bulk order & Generate Stripe Payment Link (Admins Only)
router.put('/:id/approve', protect, adminOnly, bulkOrderController.approveBulkOrder);

// 🔄 Mark Bulk Order as Paid (Admins Only)
router.put('/:id/mark-paid', protect, adminOnly, bulkOrderController.markBulkOrderAsPaid);

// 🔴 Delete bulk order (Admins Only)
router.delete('/:id', protect, adminOnly, bulkOrderController.deleteBulkOrder);

module.exports = router;
