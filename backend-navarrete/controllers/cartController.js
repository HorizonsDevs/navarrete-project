const cartService = require('../services/cartService');

// 🟢 **Get the cart for a user or guest**
exports.getCart = async (req, res) => {
    try {
        const cart = await cartService.getCart(req.user?.id, req.cookies.cartId);
        res.json(cart || { items: [] });
    } catch (error) {
        console.error("❌ Error fetching cart:", error);
        res.status(500).json({ error: "Error fetching cart." });
    }
};

// 🟢 **Add an item to the cart (User or Guest)**
exports.addItemToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        if (!productId || !quantity) {
            return res.status(400).json({ error: "Product ID and quantity are required." });
        }

        // If user is logged in, use userId; otherwise, use cartId from cookies
        const userId = req.user?.id || null;
        const cartId = req.cookies.cartId || null;

        const item = await cartService.addItemToCart(userId, cartId, productId, parseInt(quantity));

        // Set cartId cookie if user is a guest
        if (!userId) {
            res.cookie("cartId", item.cartId, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
        }

        res.status(201).json(item);
    } catch (error) {
        console.error("❌ Error adding item to cart:", error);
        res.status(500).json({ error: "Error adding item to cart." });
    }
};
