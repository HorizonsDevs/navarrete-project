const express = require('express');
const stripeController = require('../controllers/stripeController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/payment-intent', authMiddleware.protect, stripeController.createPaymentIntent);
router.get('/payments', authMiddleware.protect, stripeController.getCustomerPayments);
router.post('/refund', authMiddleware.protect, authMiddleware.adminOnly, stripeController.processRefund);

router.post('/subscription', authMiddleware.protect, stripeController.createSubscription);
router.get('/subscription', authMiddleware.protect, stripeController.getSubscription);
router.delete('/subscription', authMiddleware.protect, stripeController.cancelSubscription);

router.post('/payout', authMiddleware.protect, authMiddleware.sellerOnly, stripeController.processPayout);
router.get('/payouts', authMiddleware.protect, authMiddleware.sellerOnly, stripeController.getSellerPayouts);

module.exports = router;
