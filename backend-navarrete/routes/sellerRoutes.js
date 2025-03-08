const express = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', authMiddleware.protect, authMiddleware.sellerOnly, productController.upload, productController.createProduct);
router.put('/:id', authMiddleware.protect, authMiddleware.sellerOnly, productController.upload, productController.updateProduct);
router.delete('/:id', authMiddleware.protect, authMiddleware.sellerOnly, productController.deleteProduct);

module.exports = router;
