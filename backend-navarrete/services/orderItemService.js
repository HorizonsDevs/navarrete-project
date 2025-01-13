const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllOrderItems = async () => {
    return await prisma.orderItem.findMany();
};

exports.getOrderItemById = async (id) => {
    return await prisma.orderItem.findUnique({
        where: { id: parseInt(id) },
    });
};

exports.createOrderItem = async (data) => {
    return await prisma.orderItem.create({
        data,
    });
};

exports.updateOrderItem = async (id, data) => {
    return await prisma.orderItem.update({
        where: { id: parseInt(id) },
        data,
    });
};

exports.deleteOrderItem = async (id) => {
    const deleted = await prisma.orderItem.delete({
        where: { id: parseInt(id) },
    });
    return deleted ? true : false;
};
