const prisma = require('../prismaClient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' } // Token will now expire in 1 day
    );
};


// 🟢 Get all users (Admin Only)
exports.getAllUsers = async () => {
    return await prisma.users.findMany();
};

// 🔵 Get user by ID
exports.getUserById = async (userId) => {
    return await prisma.users.findUnique({
        where: { id: userId }
    });
};

// 🔵 Get user by email
exports.getUserByEmail = async (email) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        
        console.log("🔍 User found:", user); // Debugging line
        return user;
    } catch (error) {
        console.error("❌ Error fetching user by email:", error);
        return null;
    }
};


// 🟢 Create user (Admin Only)
exports.createUser = async (name, email, password, role) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if Stripe already has this email
        let stripeCustomerId = null;
        if (role !== 'admin') {
            try {
                const existingCustomers = await stripe.customers.list({ email });
                if (existingCustomers.data.length > 0) {
                    return { error: "This email is already registered in Stripe. Use another email." };
                }
                
                // Create Stripe Customer
                const stripeCustomer = await stripe.customers.create({ name, email });
                stripeCustomerId = stripeCustomer.id;
            } catch (stripeError) {
                console.error("Stripe Error:", stripeError);
                return { error: "Failed to create Stripe customer." };
            }
        }

        // Create user in database
        return await prisma.users.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
                stripe_customer_id: stripeCustomerId
            }
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return { error: "Failed to create users." };
    }
};

// 🟢 Register user & create Stripe Customer (Customers & Sellers)
exports.registerUser = async (name, email, password, stripeCustomerId = null, stripeAccountId = null, role = 'customer') => {
    try {
        // ✅ Ensure the password is NOT double-hashed
        if (!password.startsWith("$2b$")) {
            password = await bcrypt.hash(password, 10);
        }

        console.log("🛠️ Hashed Password Being Stored:", password);

        return await prisma.user.create({
            data: {
                name,
                email,
                password,
                role,
                stripe_customer_id: stripeCustomerId,
                stripe_account: stripeAccountId ? { connect: { id: stripeAccountId } } : undefined
            }
        });
    } catch (error) {
        console.error("❌ Error registering user:", error);
        return { error: "Failed to register user." };
    }
};



// 🟠 Update user information
exports.updateUser = async (userId, data) => {
    try {
        return await prisma.users.update({
            where: { id: userId },
            data
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return { error: "Failed to update users." };
    }
};

// 🔴 Delete user (Admin Only)
exports.deleteUser = async (userId) => {
    try {
        return await prisma.users.delete({
            where: { id: userId }
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        return { error: "Failed to delete users." };
    }
};

// 🟢 Validate user password
exports.validatePassword = async (password, hashedPassword) => {
    try {
        console.log("🔑 Checking password:", password);
        console.log("🛠️ Stored hash:", hashedPassword);

        if (!password || !hashedPassword) {
            console.error("❌ Missing password for validation");
            return false;
        }

        const match = await bcrypt.compare(password, hashedPassword);
        console.log("✅ Password Match Result:", match);
        return match;
    } catch (error) {
        console.error("❌ Error comparing passwords:", error);
        return false;
    }
};




// 🟠 Update user Stripe Subscription
exports.updateSubscription = async (userId, stripeSubscriptionId) => {
    try {
        return await prisma.users.update({
            where: { id: userId },
            data: { stripe_subscription_id: stripeSubscriptionId }
        });
    } catch (error) {
        console.error("Error updating subscription:", error);
        return { error: "Failed to update subscription." };
    }
};

// 🟢 Generate JWT Token
exports.generateToken = generateToken;
