const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const sharp = require('sharp');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const validator = require('validator');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


// Load environment variables
dotenv.config();



if (!process.env.JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET is not defined!");
    process.exit(1);
}

const JWT_SECRET = process.env.JWT_SECRET;
const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
const allowedOrigins = [
    'http://localhost:5173',  // Allow frontend running locally
    'https://yourfrontend.com', 
    'https://anothertrusteddomain.com'
];

app.use(cors({
    origin: '*', // Allows all origins
    credentials: true, // Allows sending cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));



// Rate Limiting for Login Attempts
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per 15 minutes
    message: "Too many login attempts. Try again later."
});

// Configure Multer for secure file uploads
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max file size
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only images are allowed!'), false);
        }
        cb(null, true);
    }
});

// Swagger Configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Secure API',
            version: '1.0.0',
            description: 'A secure API implementation with JWT authentication and best practices',
        },
        servers: [
            { url: 'http://localhost:3000' },
        ],
        tags: [
            { name: 'Users', description: 'Endpoints for user management' },
            { name: 'Orders', description: 'Endpoints for order management' },
            { name: 'Products', description: 'Endpoints for product management' },
        ],
    },
    apis: ['./index.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middleware to check if user is seller
const verifySeller = async (req, res, next) => {
    try {
        const token = req.cookies.auth_token;
        if (!token) return res.status(403).json({ error: 'Access denied' });
        
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
        
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized access' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Seller Portal Routes
app.get('/api/seller/products', verifySeller, async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching products');
    }
});

app.post('/api/seller/products', verifySeller, upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, stockQuantity } = req.body;
        let imageData = null;
        if (req.file) {
            imageData = await sharp(req.file.buffer).webp({ quality: 80 }).toBuffer();
        }
        const product = await prisma.product.create({
            data: { name, description, price: parseFloat(price), stockQuantity: parseInt(stockQuantity), imageData }
        });
        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating product');
    }
});

app.put('/api/seller/products/:id', verifySeller, upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, stockQuantity } = req.body;
        let imageData = null;
        if (req.file) {
            imageData = await sharp(req.file.buffer).webp({ quality: 80 }).toBuffer();
        }
        const product = await prisma.product.update({
            where: { id: req.params.id },
            data: { name, description, price, stockQuantity, ...(imageData && { imageData }) },
        });
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating product');
    }
});

app.delete('/api/seller/products/:id', verifySeller, async (req, res) => {
    try {
        await prisma.product.delete({ where: { id: req.params.id } });
        res.send('Product deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting product');
    }
});

// Protect Swagger API with Authentication
app.use('/api-docs', (req, res, next) => {
    const auth = { login: 'admin', password: process.env.SWAGGER_PASSWORD || 'swaggerpass' };
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    if (login && password && login === auth.login && password === auth.password) {
        return next();
    }

    res.set('WWW-Authenticate', 'Basic realm="401"');
    res.status(401).send('Authentication required.');
}, swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ========================== USERS ==========================

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints for user management
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     description: Retrieve a list of all users.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *                   stripeCustomerId:
 *                     type: string
 *                     nullable: true
 */
app.get('/api/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching users');
    }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     description: Retrieve details of a specific user.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The UUID of the user to retrieve.
 *     responses:
 *       200:
 *         description: User details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                 stripeCustomerId:
 *                   type: string
 *                   nullable: true
 *       404:
 *         description: User not found.
 */
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.params.id },
        });
        if (!user) return res.status(404).send('User not found');
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching user');
    }
});

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     description: Creates a new user and generates a Stripe Customer ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The full name of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password for the user account.
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 stripeCustomerId:
 *                   type: string
 */
app.post('/api/users/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, email, and password are required" });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user and generate Stripe Customer ID
        const stripeCustomer = await stripe.customers.create({ name, email });

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                stripeCustomerId: stripeCustomer.id,
            },
        });

        res.status(201).json({ message: "User registered successfully!", stripeCustomerId: stripeCustomer.id });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error registering user');
    }
});

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     description: Authenticate user and return a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                     stripeCustomerId:
 *                       type: string
 *                       nullable: true
 */
app.post('/api/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: "7d", // Token expires in 7 days
        });

        // Return token and user info (excluding password)
        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                stripeCustomerId: user.stripeCustomerId,
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in user');
    }
});



// ========================== ORDERS ==========================
/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Endpoints for order management
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     description: Retrieve a list of all orders.
 *     responses:
 *       200:
 *         description: A list of orders.
 */
app.get('/orders', async (req, res) => {
    try {
        const orders = await prisma.order.findMany();
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching orders');
    }
});

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     description: Retrieve details of a specific order.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the order to retrieve.
 *     responses:
 *       200:
 *         description: Details of the requested order.
 */
app.get('/orders/:id', async (req, res) => {
    try {
        const order = await prisma.order.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        if (!order) return res.status(404).send('Order not found');
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching order');
    }
});

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: integer
 *               total_price:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created successfully.
 */
app.post('/orders', async (req, res) => {
    try {
        const { customer_id, total_price, status } = req.body;
        const order = await prisma.order.create({
            data: { customer_id, total_price, status },
        });
        res.status(201).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating order');
    }
});

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the order to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: integer
 *               total_price:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order updated successfully.
 */
app.put('/orders/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { customer_id, total_price, status } = req.body;
        const order = await prisma.order.update({
            where: { id: parseInt(id) },
            data: { customer_id, total_price, status },
        });
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating order');
    }
});

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the order to delete.
 *     responses:
 *       200:
 *         description: Order deleted successfully.
 */
app.delete('/orders/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.order.delete({ where: { id: parseInt(id) } });
        res.send('Order deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting order');
    }
});

// ========================== ORDER ITEMS ==========================
/**
 * @swagger
 * tags:
 *   name: Order Items
 *   description: Endpoints for order item management
 */

/**
 * @swagger
 * /order_items:
 *   get:
 *     summary: Get all order items
 *     tags: [Order Items]
 *     description: Retrieve a list of all order items.
 *     responses:
 *       200:
 *         description: A list of order items.
 */
app.get('/order_items', async (req, res) => {
    try {
        const orderItems = await prisma.orderItem.findMany();
        res.json(orderItems);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching order items');
    }
});

/**
 * @swagger
 * /order_items:
 *   post:
 *     summary: Create a new order item
 *     tags: [Order Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: integer
 *               product_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Order item created successfully.
 */
app.post('/order_items', async (req, res) => {
    try {
        const { order_id, product_id, quantity } = req.body;
        const orderItem = await prisma.orderItem.create({
            data: { order_id, product_id, quantity },
        });
        res.status(201).json(orderItem);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating order item');
    }
});

/**
 * @swagger
 * /order_items/{id}:
 *   delete:
 *     summary: Delete an order item
 *     tags: [Order Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *        
 *         description: The ID of the order item to delete.
 *     responses:
 *       200:
 *         description: Order item deleted successfully.
 */
app.delete('/order_items/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.orderItem.delete({ where: { id: parseInt(id) } });
        res.send('Order item deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting order item');
    }
});

// ========================== BULK ORDERS ==========================
/**
 * @swagger
 * /bulk_orders:
 *   get:
 *     summary: Get all bulk orders
 *     tags: [Bulk Orders]
 *     description: Retrieve a list of all bulk orders.
 *     responses:
 *       200:
 *         description: A list of bulk orders.
 */
app.get('/bulk_orders', async (req, res) => {
    try {
        const bulkOrders = await prisma.bulkOrder.findMany();
        res.json(bulkOrders);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching bulk orders');
    }
});

/**
 * @swagger
 * /bulk_orders:
 *   post:
 *     summary: Create a new bulk order
 *     tags: [Bulk Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: integer
 *               total_price:
 *                 type: number
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Bulk order created successfully.
 */
app.post('/bulk_orders', async (req, res) => {
    try {
        const { customer_id, total_price, items } = req.body;
        const bulkOrder = await prisma.bulkOrder.create({
            data: { customer_id, total_price, items },
        });
        res.status(201).json(bulkOrder);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating bulk order');
    }
});

// ========================== AUDIT LOGS ==========================
/**
 * @swagger
 * tags:
 *   name: Audit Logs
 *   description: Endpoints for audit log management
 */

/**
 * @swagger
 * /audit_logs:
 *   get:
 *     summary: Get all audit logs
 *     tags: [Audit Logs]
 *     description: Retrieve a list of all audit logs.
 *     responses:
 *       200:
 *         description: A list of audit logs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   action:
 *                     type: string
 *                   user_id:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *                     format: date-time
 */
app.get('/audit_logs', async (req, res) => {
    try {
        const auditLogs = await prisma.auditLog.findMany();
        res.json(auditLogs);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching audit logs');
    }
});

/**
 * @swagger
 * /audit_logs:
 *   post:
 *     summary: Create a new audit log
 *     tags: [Audit Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: string
 *               user_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Audit log created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 action:
 *                   type: string
 *                 user_id:
 *                   type: integer
 *                 created_at:
 *                   type: string
 *                   format: date-time
 */
app.post('/audit_logs', async (req, res) => {
    try {
        const { action, user_id } = req.body;
        const auditLog = await prisma.auditLog.create({
            data: { action, user_id },
        });
        res.status(201).json(auditLog);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating audit log');
    }
});

/**
 * @swagger
 * /audit_logs/{id}:
 *   delete:
 *     summary: Delete an audit log
 *     tags: [Audit Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the audit log to delete.
 *     responses:
 *       200:
 *         description: Audit log deleted successfully.
 */
app.delete('/audit_logs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.auditLog.delete({ where: { id: parseInt(id) } });
        res.send('Audit log deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting audit log');
    }
});

// ========================== PRODUCTS ==========================

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints for managing products
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     description: Retrieve a list of all products.
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   stockQuantity:
 *                     type: integer
 *                   stripeProductId:
 *                     type: string
 *                     nullable: true
 *                   stripePriceId:
 *                     type: string
 *                     nullable: true
 *                   imageData:
 *                     type: string
 *                     nullable: true
 *                     description: Base64-encoded image data.
 */
app.get('/api/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching products');
    }
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     description: Retrieve details of a specific product.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The UUID of the product to retrieve.
 *     responses:
 *       200:
 *         description: Details of the requested product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 stockQuantity:
 *                   type: integer
 *                 stripeProductId:
 *                   type: string
 *                   nullable: true
 *                 stripePriceId:
 *                   type: string
 *                   nullable: true
 *                 imageData:
 *                   type: string
 *                   nullable: true
 *                   description: Base64-encoded image data.
 *       404:
 *         description: Product not found.
 */
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: req.params.id },
        });
        if (!product) return res.status(404).send('Product not found');
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching product');
    }
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file for the product.
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stockQuantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product created successfully.
 */
app.post('/api/products', upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, stockQuantity } = req.body;
        let imageData = null;

        if (req.file) {
            imageData = await sharp(req.file.buffer).webp({ quality: 80 }).toBuffer();
        }

        const product = await prisma.product.create({
            data: { name, description, price: parseFloat(price), stockQuantity: parseInt(stockQuantity), imageData },
        });

        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating product');
    }
});

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The UUID of the product to update.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The new image file for the product.
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stockQuantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *       404:
 *         description: Product not found.
 */
app.put('/api/products/:id', upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, stockQuantity } = req.body;
        let imageData = null;

        if (req.file) {
            imageData = await sharp(req.file.buffer).webp({ quality: 80 }).toBuffer();
        }

        const product = await prisma.product.update({
            where: { id: req.params.id },
            data: { name, description, price, stockQuantity, ...(imageData && { imageData }) },
        });

        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating product');
    }
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The UUID of the product to delete.
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *       404:
 *         description: Product not found.
 */
app.delete('/api/products/:id', async (req, res) => {
    try {
        await prisma.product.delete({ where: { id: req.params.id } });
        res.send('Product deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting product');
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
