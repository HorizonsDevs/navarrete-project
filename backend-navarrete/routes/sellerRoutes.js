const express = require('express');
const productController = require('../controllers/productController'); // ✅ Ensure this path is correct
const { protect, sellerOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

// 🟢 Get all products
router.get('/', productController.getAllProducts);

// 🔵 Get product by ID
router.get('/:id', productController.getProductById);

// 🟢 Create a product (Sellers Only)
router.post(
    '/',
    protect,
    sellerOnly,
    productController.upload, // ✅ Handles image uploads before passing to `createProduct`
    productController.createProduct // ✅ Ensure this is correctly defined
);

// 🟠 Update a product (Sellers Only)
router.put(
    '/:id',
    protect,
    sellerOnly,
    productController.upload,
    productController.updateProduct
);

// 🔴 Delete a product (Sellers Only)
router.delete('/:id', protect, sellerOnly, productController.deleteProduct);

module.exports = router;
