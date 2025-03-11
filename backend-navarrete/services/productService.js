const prisma = require('../prismaClient');

// 🟢 Get all products
exports.getAllProducts = async () => {
    return await prisma.product.findMany();
};

// 🔵 Get product by ID
exports.getProductById = async (productId) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: productId },
            include: { order_item: true } // ✅ Ensure correct relation name
        });

        if (!product) {
            return { error: "Product not found" };
        }

        return product;
    } catch (error) {
        console.error("❌ Error fetching product:", error);
        return { error: "Failed to retrieve product." };
    }
};


// 🟢 Create a new product
exports.createProduct = async ({ name, description, price, stockQuantity, stripeProductId, stripePriceId, imageUrl }) => {
    return await prisma.product.create({
        data: {
            name,
            description,
            price,
            stock_quantity: stockQuantity,
            image_url: imageUrl,
            stripe_product_id: stripeProductId, // ✅ Save Stripe Product ID
            stripe_price_id: stripePriceId     // ✅ Save Stripe Price ID
        }
    });
};


// 🟠 Update product
exports.updateProduct = async (productId, data) => {
    return await prisma.product.update({
        where: { id: productId },
        data
    });
};

// 🔴 Delete product
exports.deleteProduct = async (productId) => {
    return await prisma.product.delete({
        where: { id: productId }
    });
};
