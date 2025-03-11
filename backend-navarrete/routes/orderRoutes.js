const express = require('express');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// ✅ GET all orders (Admin & Seller)
router.get('/', authMiddleware.protect, orderController.getAllOrders);

// ✅ GET single order by ID
router.get('/:id', authMiddleware.protect, orderController.getOrderById);

// ✅ POST create a new order (Customers Only)
router.post('/', authMiddleware.protect, orderController.createOrder);

// ✅ PUT update order status (Seller & Admin)
router.put('/:id', authMiddleware.protect, orderController.updateOrderStatus);

// ✅ DELETE order (Seller & Admin)
router.delete('/:id', authMiddleware.protect, orderController.deleteOrder);

// ✅ PUT refund an order (Seller & Admin)
router.put('/:id/refund', authMiddleware.protect, orderController.markOrderAsRefunded);

module.exports = router;
