const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const userService = require('../services/userService');

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching users' });
    }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching user' });
    }
};

// Create user (Admin Only)
exports.createUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userService.createUser(name, email, hashedPassword, role);

        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating user' });
    }
};

// Update user (with Stripe sync)
exports.updateUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const updatedUser = await userService.updateUser(req.params.id, req.body);

        // Update Stripe Customer
        if (user.stripe_customer_id) {
            await stripe.customers.update(user.stripe_customer_id, {
                name: req.body.name || user.name,
                email: req.body.email || user.email,
            });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating user' });
    }
};

// Delete user (Remove from DB & Stripe)
exports.deleteUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (user.stripe_customer_id) {
            await stripe.customers.del(user.stripe_customer_id);
        }

        await userService.deleteUser(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting user' });
    }
};

// Register a new user (Customer or Seller)
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create Stripe Customer
        const stripeCustomer = await stripe.customers.create({ name, email });

        let stripeAccountId = null;
        if (role === 'seller') {
            // Create a Stripe Connected Account for the seller
            const stripeAccount = await stripe.accounts.create({ type: 'express', email });
            stripeAccountId = stripeAccount.id;
        }

        // Register user with role
        const token = await userService.registerUser(name, email, hashedPassword, stripeCustomer.id, stripeAccountId, role);

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

// Login user & authenticate
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
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

        // Return token and user info
        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                stripeCustomerId: user.stripe_customer_id, // Add any other fields you want
                // Include any other fields from the user model you want to send back
            }
        });

    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
};




// Get Seller Details
exports.getSellerDetails = async (req, res) => {
    try {
        const seller = await userService.getUserById(req.params.id);
        if (!seller || seller.role !== 'seller') {
            return res.status(404).json({ error: 'Seller not found' });
        }

        res.json(seller);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching seller details' });
    }
};

// Connect Seller to Stripe (For Express Onboarding)
exports.connectStripe = async (req, res) => {
    try {
        const seller = await userService.getUserById(req.user.id);
        if (!seller || seller.role !== 'seller') {
            return res.status(403).json({ error: 'Only sellers can connect to Stripe' });
        }

        const stripeAccountLink = await stripe.accountLinks.create({
            account: seller.stripe_account_id,
            refresh_url: process.env.FRONTEND_URL + '/dashboard',
            return_url: process.env.FRONTEND_URL + '/dashboard',
            type: 'account_onboarding',
        });

        res.json({ url: stripeAccountLink.url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error connecting to Stripe' });
    }
};
