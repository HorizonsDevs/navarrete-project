require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const Stripe = require('stripe');
const fs = require('fs');
const path = require('path');

// ✅ Ensure `uploads/` folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('✅ uploads/ folder created successfully.');
} else {
    console.log('📂 uploads/ folder already exists.');
}

// ✅ Initialize Express App
const app = express();

// ✅ Initialize Prisma
const prisma = new PrismaClient();

// ✅ Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Middleware Configuration
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'  // Change to your frontend URL
}));

app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: true })); // Parses form-data bodies
app.use(cookieParser());
app.use(helmet());
app.use('/uploads', express.static('uploads'));

// ✅ Rate Limiting (Prevents abuse)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);

// ✅ Middleware to attach Prisma & Stripe to requests
app.use((req, res, next) => {
    req.prisma = prisma;
    req.stripe = stripe;
    next();
});

// ✅ Import Routes
const userRoutes = require('./routes/userRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const bulkOrderRoutes = require('./routes/bulkOrderRoutes');
const cartRoutes = require('./routes/cartRoutes');  // 🛒 Add cart routes

// ✅ Register Routes
app.use('/api/users', userRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/bulk-orders', bulkOrderRoutes);
app.use('/api/cart', cartRoutes);  // 🛒 Add cart endpoint

// ✅ Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the Navarrete API!');
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
