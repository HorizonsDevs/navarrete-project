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

        res.json({
            ...product,
            imageUrls: product.image_urls, // ✅ Return all images as an array
        });
    } catch (error) {
        console.error("❌ Error fetching product:", error);
        res.status(500).json({ error: "Failed to retrieve product." });
    }
};


// 🟢 **Create a new product (Sellers Only)**
// 🟢 **Create a new product (Sellers Only)**
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price, stockQuantity, imageUrls } = req.body;
        const product = await productService.getProductById(req.params.id);

        if (!product) return res.status(404).json({ error: "Product not found." });

        let updatedImageUrls = [...(product.image_urls || [])]; // ✅ Preserve existing images

        // ✅ Remove unwanted images if `imageUrls` is provided
        if (imageUrls && Array.isArray(imageUrls)) {
            updatedImageUrls = updatedImageUrls.filter(img => imageUrls.includes(img));

            // ✅ Physically delete removed images from `uploads/`
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

        // ✅ Process newly uploaded images
        if (req.files && req.files.length > 0) {
            for (let file of req.files) {
                const filename = `${Date.now()}-${file.originalname.replace(/\s/g, '')}.webp`; // ✅ Remove spaces
                const imagePath = path.join(__dirname, '../uploads', filename);

                await sharp(file.buffer)
                    .resize(500, 500)
                    .toFormat('webp')
                    .webp({ quality: 80 })
                    .toFile(imagePath);

                updatedImageUrls.push(`/uploads/${filename}`);
                console.log(`✅ New image saved: ${filename}`);
            }
        }

        // ✅ Update Stripe product images safely
        if (product.stripeProductId) {
            try {
                await stripe.products.update(product.stripeProductId, {
                    name: name || product.name,
                    description: description || product.description,
                    images: updatedImageUrls.map(img => `http://localhost:3000${img}`),
                });
                console.log(`🔄 Stripe product updated: ${product.stripeProductId}`);
            } catch (stripeError) {
                console.warn("⚠️ Stripe update failed:", stripeError.message);
            }
        }

        // ✅ Update product in the database
        const updatedProduct = await productService.updateProduct(req.params.id, {
            name,
            description,
            price: price !== undefined ? parseFloat(price) : product.price,
            stockQuantity: stockQuantity !== undefined ? parseInt(stockQuantity) : product.stockQuantity,
            image_urls: updatedImageUrls, // ✅ Store correctly formatted image URLs
        });

        console.log(`✅ Product updated successfully: ${updatedProduct.id}`);
        res.json(updatedProduct);
    } catch (error) {
        console.error("❌ Error updating product:", error);
        res.status(500).json({ error: "Failed to update product." });
    }
};





// 🟠 **Update a product (Sellers Only)**
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price, stockQuantity, imageUrls } = req.body;
        const product = await productService.getProductById(req.params.id);
        
        if (!product) return res.status(404).json({ error: "Product not found." });

        let updatedImageUrls = [...(product.image_urls || [])]; // ✅ Ensure array exists

        // ✅ Remove unwanted images if `imageUrls` is provided
        if (imageUrls && Array.isArray(imageUrls)) {
            updatedImageUrls = updatedImageUrls.filter(img => imageUrls.includes(img));

            // ✅ Physically delete removed images
            for (const oldImage of product.image_urls) {
                if (!imageUrls.includes(oldImage)) {
                    const fullPath = path.join(__dirname, '../', oldImage);
                    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
                }
            }
        }

        // ✅ Append newly uploaded images
        if (req.files && req.files.length > 0) {
            for (let file of req.files) {
                const filename = `${Date.now()}-${file.originalname}.webp`;
                const imagePath = path.join(__dirname, '../uploads', filename);

                await sharp(file.buffer)
                    .resize(500, 500)
                    .toFormat('webp')
                    .webp({ quality: 80 })
                    .toFile(imagePath);

                updatedImageUrls.push(`/uploads/${filename}`);
            }
        }

        // ✅ Update Stripe product images safely
        if (product.stripeProductId) {
            try {
                await stripe.products.update(product.stripeProductId, {
                    name: name || product.name,
                    description: description || product.description,
                    images: updatedImageUrls.map(img => `http://localhost:3000${img}`),
                });
            } catch (stripeError) {
                console.warn("⚠️ Stripe update failed:", stripeError.message);
            }
        }

        // ✅ Update product in the database
        const updatedProduct = await productService.updateProduct(req.params.id, {
            name,
            description,
            price: price !== undefined ? parseFloat(price) : product.price,
            stockQuantity: stockQuantity !== undefined ? parseInt(stockQuantity) : product.stockQuantity,
            image_urls: updatedImageUrls, // ✅ Ensure correct Prisma field name
        });

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
        

        // ✅ Delete the image file if it exists
        // ✅ Loop through multiple images and delete them
        if (product.image_urls && product.image_urls.length > 0) {
            for (const imageUrl of product.image_urls) {
                const imagePath = path.join(__dirname, '../', imageUrl);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
        }


        await productService.deleteProduct(req.params.id);
        res.json({ message: "Product deleted successfully." });
    } catch (error) {
        console.error("❌ Error deleting product:", error);
        res.status(500).json({ error: "Failed to delete product." });
    }
};
