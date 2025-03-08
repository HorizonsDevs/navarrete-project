const prisma = require('../prismaClient');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// 🟢 Get all products
exports.getAllProducts = async () => {
    return await prisma.product.findMany({
        include: { orderItems: true, seller: true }
    });
};

// 🔵 Get product by ID
exports.getProductById = async (productId) => {
    return await prisma.product.findUnique({
        where: { id: productId },
        include: { orderItems: true, seller: true }
    });
};

// 🔵 Get products by seller (Sellers Only)
exports.getSellerProducts = async (sellerId) => {
    return await prisma.product.findMany({
        where: { sellerId },
        include: { orderItems: true }
    });
};

// 🟢 Create a new product (Sellers Only)
exports.createProduct = async ({ name, description, price, stockQuantity, imageUrl, stripeProductId, stripePriceId, sellerId }) => {
    return await prisma.product.create({
        data: {
            name,
            description,
            price,
            stock_quantity: stockQuantity,
            image_url: imageUrl,
            stripe_product_id: stripeProductId,
            stripe_price_id: stripePriceId,
            sellerId
        }
    });
};

// 🟠 Update product (Sellers Only)
exports.updateProduct = async (productId, data) => {
    return await prisma.product.update({
        where: { id: productId },
        data
    });
};

// 🔴 Delete product (Sellers Only)
exports.deleteProduct = async (productId) => {
    return await prisma.product.delete({
        where: { id: productId }
    });
};
