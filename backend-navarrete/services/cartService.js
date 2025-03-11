const prisma = require('../prismaClient');
const { v4: uuidv4 } = require('uuid'); // Generates unique cart IDs

// 🟢 **Get the cart for a user or guest**
exports.getCart = async (userId, cartId) => {
    if (userId) {
        return await prisma.cart.findUnique({
            where: { userId },
            include: { items: true }
        });
    } else if (cartId) {
        return await prisma.cart.findUnique({
            where: { id: cartId },
            include: { items: true }
        });
    }
    return null;
};

// 🟢 **Create or Retrieve Guest Cart**
exports.getOrCreateGuestCart = async (cartId) => {
    if (cartId) {
        const cart = await prisma.cart.findUnique({ where: { id: cartId } });
        if (cart) return cart;
    }

    // Create a new guest cart
    const newCartId = uuidv4();
    return await prisma.cart.create({
        data: { id: newCartId }
    });
};

// 🟢 **Add an item to a cart (User or Guest)**
exports.addItemToCart = async (userId, cartId, productId, quantity) => {
    let cart;

    if (userId) {
        cart = await prisma.cart.upsert({
            where: { userId },
            update: {},
            create: { userId },
        });
    } else {
        cart = await exports.getOrCreateGuestCart(cartId);
    }

    return await prisma.cartItem.upsert({
        where: { cartId_productId: { cartId: cart.id, productId } },
        update: { quantity: { increment: quantity } },
        create: { cartId: cart.id, productId, quantity },
    });
};
