const bcrypt = require('bcryptjs');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const userService = require('../services/userService');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching users');
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching user');
    }
};

// Create user without registration (Admin Only)
exports.createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating user');
    }
};

// Update user information & sync with Stripe
exports.updateUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const updatedUser = await userService.updateUser(req.params.id, req.body);

        // Update Stripe Customer
        if (user.stripeCustomerId) {
            await stripe.customers.update(user.stripeCustomerId, {
                name: req.body.name || user.name,
                email: req.body.email || user.email,
            });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating user');
    }
};

// Delete user & remove from Stripe
exports.deleteUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) return res.status(404).send('User not found');

        // Delete Stripe Customer if exists
        if (user.stripeCustomerId) {
            await stripe.customers.del(user.stripeCustomerId);
        }

        const success = await userService.deleteUser(req.params.id);
        if (!success) return res.status(500).send('Error deleting user from database');

        res.send('User deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting user');
    }
};

// Register a new user & create a Stripe Customer
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, email, and password are required" });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create Stripe Customer
        const stripeCustomer = await stripe.customers.create({
            name,
            email,
        });

        // Register user with Stripe Customer ID
        const token = await userService.registerUser(name, email, hashedPassword, stripeCustomer.id);

        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login user & authenticate
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Authenticate user
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Validate password
        const isPasswordValid = await userService.validatePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = userService.generateToken(user);

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                stripeCustomerId: user.stripeCustomerId, // Include Stripe Customer ID
            }
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
