const express = require('express');
const productController = require('../controllers/productController');
const multer = require('multer');

const router = express.Router();

// Multer: Store images in memory (RAM)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', upload.single('image'), productController.createProduct);
router.put('/:id', upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
