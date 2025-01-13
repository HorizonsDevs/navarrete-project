const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
app.use(bodyParser.json());

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Navarrete Beef Jerky API',
            version: '1.0.0',
            description: 'API for managing products, users, orders, and more',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
        tags: [
            { name: 'Users', description: 'Endpoints for user management' },
            { name: 'Orders', description: 'Endpoints for order management' },
            { name: 'Order Items', description: 'Endpoints for order item management' },
            { name: 'Bulk Orders', description: 'Endpoints for bulk order management' },
            { name: 'Audit Logs', description: 'Endpoints for audit logs' },
        ],
    },
    apis: ['./index.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ========================== USERS ==========================
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints for user management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 */
app.get('/users', async (req, res) => {
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
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     description: Retrieve details of a specific user.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: Details of the requested user.
 */
app.get('/users/:id', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(req.params.id) },
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
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully.
 */
app.post('/users', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await prisma.user.create({
            data: { name, email, password, role },
        });
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating user');
    }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 */
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role } = req.body;
        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { name, email, password, role },
        });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating user');
    }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user to delete.
 *     responses:
 *       200:
 *         description: User deleted successfully.
 */
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.user.delete({ where: { id: parseInt(id) } });
        res.send('User deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting user');
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


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
