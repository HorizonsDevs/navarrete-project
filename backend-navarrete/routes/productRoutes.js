const express = require('express');
const multer = require('multer');
const productController = require('../controllers/productController');

const router = express.Router();

// Multer config - only allow image uploads
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Invalid file type. Only images are allowed.'), false);
        }
        cb(null, true);
    },
});

// Middleware for validating product input
const validateProduct = (req, res, next) => {
    const { name, price, stockQuantity } = req.body;
    if (!name || !price || !stockQuantity) {
        return res.status(400).json({ error: "Name, price, and stockQuantity are required." });
    }
    next();
};

// Wrapper to handle async errors properly
const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Product Routes
router.get('/', catchAsync(productController.getAllProducts));
router.get('/:id', catchAsync(productController.getProductById));
router.post('/', upload.single('image'), validateProduct, catchAsync(productController.createProduct));
router.put('/:id', upload.single('image'), validateProduct, catchAsync(productController.updateProduct));
router.delete('/:id', catchAsync(productController.deleteProduct));

module.exports = router;
