const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllUsers = async () => {
    return await prisma.user.findMany();
};

exports.getUserById = async (id) => {
    return await prisma.user.findUnique({
        where: { id: parseInt(id) },
    });
};

exports.createUser = async (data) => {
    return await prisma.user.create({
        data,
    });
};

exports.updateUser = async (id, data) => {
    return await prisma.user.update({
        where: { id: parseInt(id) },
        data,
    });
};

exports.deleteUser = async (id) => {
    const deleted = await prisma.user.delete({
        where: { id: parseInt(id) },
    });
    return deleted ? true : false;
};
