const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllAuditLogs = async () => {
    return await prisma.auditLog.findMany();
};

exports.getAuditLogById = async (id) => {
    return await prisma.auditLog.findUnique({
        where: { id: parseInt(id) },
    });
};

exports.createAuditLog = async (data) => {
    return await prisma.auditLog.create({
        data,
    });
};

exports.updateAuditLog = async (id, data) => {
    return await prisma.auditLog.update({
        where: { id: parseInt(id) },
        data,
    });
};

exports.deleteAuditLog = async (id) => {
    const deleted = await prisma.auditLog.delete({
        where: { id: parseInt(id) },
    });
    return deleted ? true : false;
};
