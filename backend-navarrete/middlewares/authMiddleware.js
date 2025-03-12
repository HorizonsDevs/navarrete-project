const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient');

// 🛡️ Protect routes (Requires Authentication)
exports.protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ error: "Unauthorized, no token" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await prisma.user.findUnique({ where: { id: decoded.id } });

        if (!req.user) return res.status(401).json({ error: "User not Hoe" });

        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};


// 🛡️ Role-based access control
exports.adminOnly = (req, res, next) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Forbidden, admin access required" });
    }
    next();
};


exports.sellerOnly = (req, res, next) => {
    console.log("User in sellerOnly:", req.user);
    
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    
    if (req.user.role === "admin") {
        console.log("Admin detected - bypassing seller-only restriction");
        return next(); // Admins bypass restrictions
    }

    if (req.user.role !== "seller") {
        return res.status(403).json({ error: "Forbidden, seller access required" });
    }

    next();
};


exports.customerOnly = (req, res, next) => {
    console.log("User in customerOnly:", req.user);
    
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.user.role === "admin") {
        console.log("Admin detected - bypassing customer-only restriction");
        return next(); // Admins bypass restrictions
    }

    if (req.user.role !== "customer") {
        return res.status(403).json({ error: "Forbidden, customer access required" });
    }

    next();
};

