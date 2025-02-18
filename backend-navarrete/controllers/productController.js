const productService = require('../services/productService');
const sharp = require('sharp');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();

        // Convert stored images back to Base64 format for frontend rendering
        const productsWithImages = products.map(product => ({
            ...product,
            imageData: product.imageData || null,
        }));

        res.json(productsWithImages);
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

        res.json({
            ...product,
            imageData: product.imageData || null, // Ensure proper Base64 format
        });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Failed to retrieve product." });
    }
};

// Create a new product with Base64 image conversion
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stockQuantity } = req.body;

        if (!name || !price || !stockQuantity) {
            return res.status(400).json({ error: "Name, price, and stockQuantity are required." });
        }

        let imageData = null;
        if (req.file) {
            const optimizedImageBuffer = await sharp(req.file.buffer)
                .resize(500) // Resize to max 500px width
                .webp({ quality: 80 }) // Convert to WebP format
                .toBuffer();

            imageData = `data:image/webp;base64,${optimizedImageBuffer.toString('base64')}`; // Convert buffer to Base64 string
        }

        const product = await productService.createProduct({
            name,
            description: description || "",
            price: parseFloat(price),
            stockQuantity: parseInt(stockQuantity),
            imageData, // Store as Base64 string
        });

        res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Failed to create product." });
    }
};


// Update a product with optional Base64 image update
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price, stockQuantity } = req.body;

        const product = await productService.getProductById(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found." });

        let imageData = product.imageData; // Preserve existing image if no new one is uploaded

        if (req.file) {
            const optimizedImageBuffer = await sharp(req.file.buffer)
                .resize(500)
                .webp({ quality: 80 })
                .toBuffer();

            imageData = `data:image/webp;base64,${optimizedImageBuffer.toString('base64')}`;
        }

        const updatedProduct = await productService.updateProduct(req.params.id, {
            name: name || product.name,
            description: description || product.description,
            price: price !== undefined ? parseFloat(price) : product.price,
            stockQuantity: stockQuantity !== undefined ? parseInt(stockQuantity) : product.stockQuantity,
            imageData, // Base64-encoded image
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
