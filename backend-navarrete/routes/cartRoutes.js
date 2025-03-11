const express = require('express');
const cartController = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', cartController.getCart); // Get cart for user/guest
router.post('/add', cartController.addItemToCart); // Add items to cart

module.exports = router;
