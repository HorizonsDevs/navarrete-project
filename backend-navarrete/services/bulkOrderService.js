const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllBulkOrders = async () => {
    return await prisma.bulkOrder.findMany();
};

exports.getBulkOrderById = async (id) => {
    return await prisma.bulkOrder.findUnique({
        where: { id: parseInt(id) },
    });
};

exports.createBulkOrder = async (data) => {
    return await prisma.bulkOrder.create({
        data,
    });
};

exports.updateBulkOrder = async (id, data) => {
    return await prisma.bulkOrder.update({
        where: { id: parseInt(id) },
        data,
    });
};

exports.deleteBulkOrder = async (id) => {
    const deleted = await prisma.bulkOrder.delete({
        where: { id: parseInt(id) },
    });
    return deleted ? true : false;
};
