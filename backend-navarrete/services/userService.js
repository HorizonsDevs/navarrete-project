const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../utils/hashUtils');

const prisma = new PrismaClient();

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.registerUser = async (email, password) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
        data: { email, password: hashedPassword },
    });

    return generateToken(newUser);
};

exports.loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid email or password");

    const isValid = await comparePassword(password, user.password);
    if (!isValid) throw new Error("Invalid email or password");

    return generateToken(user);
};

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
