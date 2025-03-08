require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const Stripe = require('stripe');

// Initialize Express App
const app = express();

// Initialize Prisma
const prisma = new PrismaClient();

// Initialize Stripe
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware
// 
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'  // <-- Set your frontend's URL here
}));

app.use(express.json()); // Body parsing middleware
app.use(express.urlencoded({ extended: true })); // URL-encoded body parser
app.use(cookieParser());
app.use(helmet());

// Rate Limiting (Prevents abuse)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);

// ✅ Import Routes (Fix paths)
const userRoutes = require('./routes/userRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const bulkOrderRoutes = require('./routes/bulkOrderRoutes');

// ✅ Register Routes
app.use('/api/users', userRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/bulk-orders', bulkOrderRoutes);

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
