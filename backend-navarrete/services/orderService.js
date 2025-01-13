const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllOrders = async () => {
    return await prisma.order.findMany();
};

exports.getOrderById = async (id) => {
    return await prisma.order.findUnique({
        where: { id: parseInt(id) },
    });
};

exports.createOrder = async (data) => {
    return await prisma.order.create({
        data,
    });
};

exports.updateOrder = async (id, data) => {
    return await prisma.order.update({
        where: { id: parseInt(id) },
        data,
    });
};

exports.deleteOrder = async (id) => {
    const deleted = await prisma.order.delete({
        where: { id: parseInt(id) },
    });
    return deleted ? true : false;
};
