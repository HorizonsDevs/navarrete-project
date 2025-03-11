const express = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// ✅ Public routes (no authentication needed)
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// ✅ Protected routes (sellers only, but admins can bypass)
router.post(
    '/',
    authMiddleware.protect,
    authMiddleware.sellerOnly,
    productController.upload, // ✅ Use the correct upload function from productController
    productController.createProduct
);

router.put(
    '/:id',
    authMiddleware.protect,
    authMiddleware.sellerOnly,
    productController.upload, // ✅ Correctly handle image uploads
    productController.updateProduct
);

router.delete('/:id', authMiddleware.protect, authMiddleware.sellerOnly, productController.deleteProduct);

module.exports = router;
