const productService = require('../services/productService');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching products');
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching product');
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating product');
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating product');
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const success = await productService.deleteProduct(req.params.id);
        if (!success) {
            return res.status(404).send('Product not found');
        }
        res.send('Product deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting product');
    }
};
