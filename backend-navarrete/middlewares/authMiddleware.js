const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient');


// 🛡️ Protect routes (Requires Authentication)
exports.protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ error: "Unauthorized, no token" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await prisma.user.findUnique({ where: { id: decoded.id } });

        if (!req.user) return res.status(401).json({ error: "User not found" });

        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

// 🛡️ Admin-only access
exports.adminOnly = (req, res, next) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Forbidden, admin access required" });
    }
    next();
};

// 🛡️ Seller-only access
exports.sellerOnly = (req, res, next) => {
    if (req.user?.role !== "seller") {
        return res.status(403).json({ error: "Forbidden, seller access required" });
    }
    next();
};

// 🛡️ Protect routes (Requires Authentication)
exports.protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ error: "Unauthorized, no token" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await prisma.user.findUnique({ where: { id: decoded.id } });

        if (!req.user) return res.status(401).json({ error: "User not found" });

        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

// 🛡️ Admin-only access
exports.adminOnly = (req, res, next) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Forbidden, admin access required" });
    }
    next();
};

// 🛡️ Seller-only access
exports.sellerOnly = (req, res, next) => {
    if (req.user?.role !== "seller") {
        return res.status(403).json({ error: "Forbidden, seller access required" });
    }
    next();
};

// 🛡️ Customer-only access
exports.customerOnly = (req, res, next) => {
    if (req.user?.role !== "customer") {
        return res.status(403).json({ error: "Forbidden, customer access required" });
    }
    next();
};

exports.customerOnly = (req, res, next) => {
    if (req.user?.role !== "customer") {
        return res.status(403).json({ error: "Forbidden, customer access required" });
    }
    next();
};
