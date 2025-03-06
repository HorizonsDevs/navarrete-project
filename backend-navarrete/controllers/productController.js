const productService = require('../services/productService');
const sharp = require('sharp');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Stripe API Key
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save images in the `uploads` directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only images are allowed!'), false);
        }
        cb(null, true);
    }
});


// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();

        const productsWithImages = products.map(product => ({
            ...product,
            imageUrl: product.imageUrl ? `http://localhost:3000${product.imageUrl}` : null,
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
            imageUrl: product.imageUrl ? `http://localhost:3000${product.imageUrl}` : null,
        });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Failed to retrieve product." });
    }
};

// Create a new product in both DB and Stripe
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stockQuantity } = req.body;

        if (!name || !price || !stockQuantity) {
            return res.status(400).json({ error: "Name, price, and stockQuantity are required." });
        }

        let imageUrl = null;
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`; // Store the image path
        }

        // Create Stripe product
        const stripeProduct = await stripe.products.create({
            name,
            description: description || "",
            images: imageUrl ? [`http://localhost:3000${imageUrl}`] : [], // Pass full URL to Stripe
        });

        // Create Stripe price
        const stripePrice = await stripe.prices.create({
            unit_amount: Math.round(price * 100),
            currency: 'usd',
            product: stripeProduct.id,
        });

        // Save product in DB
        const product = await productService.createProduct({
            name,
            description: description || "",
            price: parseFloat(price),
            stockQuantity: parseInt(stockQuantity),
            imageUrl, // Save image path, not binary data
            stripeProductId: stripeProduct.id,
            stripePriceId: stripePrice.id,
        });

        res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Failed to create product." });
    }
};


// Update a product in both DB and Stripe
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price, stockQuantity } = req.body;

        const product = await productService.getProductById(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found." });

        let imageUrl = product.imageUrl;
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`; // Update image URL
        }

        // Update Stripe product
        if (product.stripeProductId) {
            await stripe.products.update(product.stripeProductId, {
                name: name || product.name,
                description: description || product.description,
                images: imageUrl ? [`http://localhost:3000${imageUrl}`] : [],
            });
        }

        // Update DB
        const updatedProduct = await productService.updateProduct(req.params.id, {
            name: name || product.name,
            description: description || product.description,
            price: price !== undefined ? parseFloat(price) : product.price,
            stockQuantity: stockQuantity !== undefined ? parseInt(stockQuantity) : product.stockQuantity,
            imageUrl, // Store the new image path
        });

        res.json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Failed to update product." });
    }
};


// Delete a product from both DB and Stripe
exports.deleteProduct = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found." });

        // Delete Stripe product
        if (product.stripeProductId) {
            await stripe.products.del(product.stripeProductId);
        }

        // Delete from DB
        const success = await productService.deleteProduct(req.params.id);
        if (!success) return res.status(500).json({ error: "Failed to delete product from DB." });

        res.json({ message: "Product deleted successfully." });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Failed to delete product." });
    }
};
