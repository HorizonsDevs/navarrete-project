const productService = require('../services/productService');
const sharp = require('sharp');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const UPLOADS_DIR = path.join(__dirname, '../uploads');

// ✅ Ensure `/uploads/` directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    console.log("📂 Created `uploads/` directory.");
}

// ✅ Configure Multer for handling multiple images
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max per image
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only images are allowed!'), false);
        }
        cb(null, true);
    }
});

// ✅ Middleware for handling multiple image uploads
exports.upload = upload.array('images', 5); // Accept up to 5 images

// 🟢 **Get all products**
exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error("❌ Error fetching products:", error);
        res.status(500).json({ error: "Failed to retrieve products." });
    }
};

// 🔵 **Get a product by ID**
exports.getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found." });

        res.json({ ...product });
    } catch (error) {
        console.error("❌ Error fetching product:", error);
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

        let imageUrls = [];

        console.log("🟢 Files Received:", req.files);

        // ✅ Step 1: Create Product in DB First to Get UUID
        const newProduct = await productService.createProduct({
            name,
            description,
            price: parseFloat(price),
            stock_quantity: parseInt(stockQuantity), // ✅ Fix: Use `stock_quantity` (matches Prisma)
            image_urls: [] // Images will be added later
        });

        if (!newProduct || !newProduct.id) {
            return res.status(500).json({ error: "Failed to generate product UUID." });
        }

        const productUUID = newProduct.id; // ✅ Use the UUID assigned by the DB
        console.log("🟢 Product Created, UUID:", productUUID);

        // ✅ Step 2: Process & Save Images with `{PRODUCT_UUID}_{Counter}.webp` Format
        if (req.files && req.files.length > 0) {
            let counter = 1;
            for (let file of req.files) {
                const filename = `${productUUID}_${String(counter).padStart(3, '0')}.webp`;
                const imagePath = path.join(UPLOADS_DIR, filename);

                await sharp(file.buffer)
                    .resize(500, 500)
                    .toFormat('webp')
                    .webp({ quality: 80 })
                    .toFile(imagePath);

                imageUrls.push(`/uploads/${filename}`);
                console.log(`✅ Image saved: ${filename}`);
                counter++;
            }
        }

        console.log("🟢 Final Image URLs:", imageUrls);

        // ✅ Step 3: Create Stripe Product
        let stripe_product_id = null;
        let stripe_price_id = null;

        try {
            const stripeProduct = await stripe.products.create({
                name,
                description,
                images: imageUrls.map(img => `http://localhost:3000${img}`),
            });

            stripe_product_id = stripeProduct.id;
            console.log("✅ Stripe Product Created:", stripe_product_id);

            // ✅ Step 4: Create Stripe Price
            if (price) {
                const stripePrice = await stripe.prices.create({
                    unit_amount: Math.round(price * 100), // Convert to cents
                    currency: 'usd',
                    product: stripe_product_id,
                });

                stripe_price_id = stripePrice.id;
                console.log("✅ Stripe Price Created:", stripe_price_id);
            }
        } catch (stripeError) {
            console.error("❌ Stripe API Error:", stripeError);
            return res.status(500).json({ error: "Failed to create Stripe product." });
        }

        // ✅ Step 5: Update Product in DB with Images & Stripe IDs
        const updatedProduct = await productService.updateProduct(newProduct.id, {
            stripe_product_id, // ✅ Fix: Use correct Prisma field name
            stripe_price_id,   // ✅ Fix: Use correct Prisma field name
            image_urls: imageUrls, // ✅ Store image URLs properly
        });

        console.log("🟢 Product Updated with Images & Stripe:", updatedProduct);
        res.status(201).json(updatedProduct);
    } catch (error) {
        console.error("❌ Error creating product:", error);
        res.status(500).json({ error: "Failed to create product." });
    }
};





// 🟠 **Update a product (Sellers Only)**
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price, stock_quantity, imageUrls } = req.body;
        const productId = req.params.id;

        console.log("🟢 Received Update Request for Product ID:", productId);
        console.log("🟢 Request Body:", req.body);

        // ✅ Step 1: Check if Product Exists
        const product = await productService.getProductById(productId);
        if (!product) {
            console.error("❌ Product not found:", productId);
            return res.status(404).json({ error: "Product not found." });
        }

        // ✅ Step 2: Log Incoming Images
        let updatedImageUrls = [...(product.image_urls || [])];
        console.log("🔵 Existing Image URLs:", updatedImageUrls);
        console.log("🟢 Files Received:", req.files);

        // ✅ Step 3: Handle Image Deletions
        if (imageUrls && Array.isArray(imageUrls)) {
            updatedImageUrls = updatedImageUrls.filter(img => imageUrls.includes(img));

            for (const oldImage of product.image_urls) {
                if (!imageUrls.includes(oldImage)) {
                    const fullPath = path.join(__dirname, '../', oldImage);
                    if (fs.existsSync(fullPath)) {
                        fs.unlinkSync(fullPath);
                        console.log(`🗑️ Deleted old image: ${fullPath}`);
                    }
                }
            }
        }

        // ✅ Step 4: Handle New Image Uploads (Start at `_000.webp`)
        if (req.files && req.files.length > 0) {
            let counter = 0; // ✅ Reset to zero
            for (let file of req.files) {
                const filename = `${product.id}_${String(counter).padStart(3, '0')}.webp`; 
                const imagePath = path.join(__dirname, '../uploads', filename);

                await sharp(file.buffer)
                    .resize(500, 500)
                    .toFormat('webp')
                    .webp({ quality: 80 })
                    .toFile(imagePath);

                updatedImageUrls.push(`/uploads/${filename}`);
                console.log(`✅ New Image Saved: ${filename}`);
                counter++;
            }
        }

        console.log("🟢 Final Updated Image URLs:", updatedImageUrls);

        // ✅ Step 5: Update Stripe Product (If Exists)
        if (product.stripe_product_id) {
            try {
                await stripe.products.update(product.stripe_product_id, {
                    name: name || product.name,
                    description: description || product.description,
                    images: updatedImageUrls.map(img => `http://localhost:3000${img}`),
                });
                console.log(`🔄 Stripe Product Updated: ${product.stripe_product_id}`);
            } catch (stripeError) {
                console.warn("⚠️ Stripe update failed:", stripeError.message);
            }
        }

        // ✅ Step 6: Update Product in Database
        const updatedProduct = await productService.updateProduct(productId, {
            name,
            description,
            price: price !== undefined ? parseFloat(price) : product.price,
            stock_quantity: stock_quantity !== undefined ? parseInt(stock_quantity) : product.stock_quantity, // ✅ Fix field name
            image_urls: updatedImageUrls,
        });

        console.log("🟢 Product Updated Successfully:", updatedProduct);
        res.json(updatedProduct);
    } catch (error) {
        console.error("❌ Error updating product:", error);
        res.status(500).json({ error: "Failed to update product." });
    }
};



// 🔴 **Delete a product (Sellers Only)**
exports.deleteProduct = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found." });

        // ✅ Delete Stripe product
        try {
            if (product.stripeProductId) {
                await stripe.products.del(product.stripeProductId);
            }
        } catch (stripeError) {
            console.warn("⚠️ Stripe product not found or already deleted:", stripeError.message);
        }

        // ✅ Delete images
        if (product.image_urls && product.image_urls.length > 0) {
            for (const imageUrl of product.image_urls) {
                const imagePath = path.join(__dirname, '../', imageUrl);
                if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
            }
        }

        await productService.deleteProduct(req.params.id);
        res.json({ message: "Product deleted successfully." });
    } catch (error) {
        console.error("❌ Error deleting product:", error);
        res.status(500).json({ error: "Failed to delete product." });
    }
};
