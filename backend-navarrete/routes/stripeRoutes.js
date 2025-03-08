const express = require('express');
const stripeController = require('../controllers/stripeController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/payment-intent', authMiddleware.protect, authMiddleware.customerOnly, stripeController.createPaymentIntent);
router.get('/payments', authMiddleware.protect, authMiddleware.customerOnly, stripeController.getCustomerPayments);
router.post('/refund', authMiddleware.protect, authMiddleware.adminOnly, stripeController.processRefund);

router.post('/subscription', authMiddleware.protect, authMiddleware.customerOnly, stripeController.createSubscription);
router.get('/subscription', authMiddleware.protect, authMiddleware.customerOnly, stripeController.getSubscription);
router.delete('/subscription', authMiddleware.protect, authMiddleware.customerOnly, stripeController.cancelSubscription);

router.post('/payout', authMiddleware.protect, authMiddleware.sellerOnly, stripeController.processPayout);
router.get('/payouts', authMiddleware.protect, authMiddleware.sellerOnly, stripeController.getSellerPayouts);

module.exports = router;
