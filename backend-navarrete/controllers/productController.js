const productService = require('../services/productService');
const sharp = require('sharp');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to retrieve products." });
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found." });

        // Convert image binary to Base64 (for direct frontend rendering)
        const productData = {
            ...product,
            imageData: product.imageData ? `data:image/webp;base64,${product.imageData.toString('base64')}` : null
        };

        res.json(productData);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Failed to retrieve product." });
    }
};

// Create a new product with WebP image conversion
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stockQuantity } = req.body;

        if (!name || !price || !stockQuantity) {
            return res.status(400).json({ error: "Name, price, and stockQuantity are required." });
        }

        let imageData = null;
        if (req.file) {
            imageData = await sharp(req.file.buffer)
                .resize(500) // Resize to max 500px width for optimization
                .webp({ quality: 80 }) // Convert to WebP format
                .toBuffer();
        }

        const product = await productService.createProduct({
            name,
            description: description || "",
            price: parseFloat(price),
            stockQuantity: parseInt(stockQuantity),
            imageData
        });

        res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Failed to create product." });
    }
};

// Update a product with optional WebP image update
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price, stockQuantity } = req.body;

        const product = await productService.getProductById(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found." });

        let imageData = null;
        if (req.file) {
            imageData = await sharp(req.file.buffer)
                .resize(500)
                .webp({ quality: 80 })
                .toBuffer();
        }

        const updatedProduct = await productService.updateProduct(req.params.id, {
            name: name || product.name,
            description: description || product.description,
            price: price ? parseFloat(price) : product.price,
            stockQuantity: stockQuantity ? parseInt(stockQuantity) : product.stockQuantity,
            ...(imageData && { imageData }) // Update image only if provided
        });

        res.json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Failed to update product." });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const success = await productService.deleteProduct(req.params.id);
        if (!success) return res.status(404).json({ error: "Product not found." });

        res.json({ message: "Product deleted successfully." });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Failed to delete product." });
    }
};
