const bcrypt = require('bcryptjs');
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

exports.createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating user');
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating user');
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const success = await userService.deleteUser(req.params.id);
        if (!success) {
            return res.status(404).send('User not found');
        }
        res.send('User deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting user');
    }
};

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, email, and password are required" });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        const token = await userService.registerUser(name, email, hashedPassword);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

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

        // Return user info (excluding password)
        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

