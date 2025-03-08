const productService = require('../services/productService');
const sharp = require('sharp');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer for image uploads
const storage = multer.memoryStorage(); // Store image in memory before processing
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

exports.upload = upload.single('image'); // Middleware for handling image uploads

// 🟢 **Get all products**
exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to retrieve products." });
    }
};

// 🔵 **Get a product by ID**
exports.getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found." });
        res.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Failed to retrieve product." });
    }
};

// 🟢 **Create a new product (Sellers Only)**
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stockQuantity } = req.body;

        if (!name || !price || !stockQuantity) {
            return res.status(400).json({ error: "Name, price, and stockQuantity are required." });
        }

        if (req.user.role !== 'seller') {
            return res.status(403).json({ error: "Only sellers can create products." });
        }

        let imageUrl = null;
        if (req.file) {
            const filename = `${Date.now()}.webp`;
            const imagePath = path.join(__dirname, '../uploads', filename);

            await sharp(req.file.buffer)
                .resize(500, 500)
                .toFormat('webp')
                .webp({ quality: 80 })
                .toFile(imagePath);

            imageUrl = `/uploads/${filename}`;
        }

        // Create Stripe product
        const stripeProduct = await stripe.products.create({
            name,
            description: description || "",
            images: imageUrl ? [`http://localhost:3000${imageUrl}`] : [],
        });

        const stripePrice = await stripe.prices.create({
            unit_amount: Math.round(price * 100),
            currency: 'usd',
            product: stripeProduct.id,
        });

        const product = await productService.createProduct({
            name,
            description: description || "",
            price: parseFloat(price),
            stockQuantity: parseInt(stockQuantity),
            imageUrl,
            stripeProductId: stripeProduct.id,
            stripePriceId: stripePrice.id,
            sellerId: req.user.id, // Associate product with seller
        });

        res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Failed to create product." });
    }
};

// 🟠 **Update a product (Sellers Only)**
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price, stockQuantity } = req.body;

        const product = await productService.getProductById(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found." });

        // Ensure only the seller who created the product can update it
        if (req.user.role !== 'seller' || req.user.id !== product.sellerId) {
            return res.status(403).json({ error: "Unauthorized to update this product." });
        }

        let imageUrl = product.imageUrl;
        if (req.file) {
            // Delete the old image if exists
            if (imageUrl) {
                const oldImagePath = path.join(__dirname, '../', imageUrl);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            const filename = `${Date.now()}.webp`;
            const imagePath = path.join(__dirname, '../uploads', filename);

            await sharp(req.file.buffer)
                .resize(500, 500)
                .toFormat('webp')
                .webp({ quality: 80 })
                .toFile(imagePath);

            imageUrl = `/uploads/${filename}`;
        }

        // Update Stripe product
        if (product.stripeProductId) {
            await stripe.products.update(product.stripeProductId, {
                name: name || product.name,
                description: description || product.description,
                images: imageUrl ? [`http://localhost:3000${imageUrl}`] : [],
            });
        }

        const updatedProduct = await productService.updateProduct(req.params.id, {
            name: name || product.name,
            description: description || product.description,
            price: price !== undefined ? parseFloat(price) : product.price,
            stockQuantity: stockQuantity !== undefined ? parseInt(stockQuantity) : product.stockQuantity,
            imageUrl,
        });

        res.json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Failed to update product." });
    }
};

// 🔴 **Delete a product (Sellers Only)**
exports.deleteProduct = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found." });

        // Ensure only the seller who created the product can delete it
        if (req.user.role !== 'seller' || req.user.id !== product.sellerId) {
            return res.status(403).json({ error: "Unauthorized to delete this product." });
        }

        // Delete Stripe product
        if (product.stripeProductId) {
            await stripe.products.del(product.stripeProductId);
        }

        // Delete Image
        if (product.imageUrl) {
            const imagePath = path.join(__dirname, '../', product.imageUrl);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await productService.deleteProduct(req.params.id);
        res.json({ message: "Product deleted successfully." });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Failed to delete product." });
    }
};
