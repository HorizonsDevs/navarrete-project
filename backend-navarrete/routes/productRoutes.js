const express = require('express');
const multer = require('multer');
const productController = require('../controllers/productController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Store in memory for processing

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', upload.single('image'), productController.createProduct);
router.put('/:id', upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
