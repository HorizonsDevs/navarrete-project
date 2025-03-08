const express = require('express');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware.protect, orderController.getAllOrders);
router.get('/:id', authMiddleware.protect, orderController.getOrderById);
router.post('/', authMiddleware.protect, authMiddleware.customerOnly, orderController.createOrder);
router.put('/:id', authMiddleware.protect, orderController.updateOrder);
router.delete('/:id', authMiddleware.protect, authMiddleware.adminOnly, orderController.deleteOrder);
router.patch('/:id', orderController.updateOrder);
router.post('/:id/refund', authMiddleware.protect, authMiddleware.adminOnly, orderController.processRefund);

module.exports = router;
