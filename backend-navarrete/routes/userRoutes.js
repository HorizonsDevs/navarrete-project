const express = require('express');
const {
    register, login, getAllUsers, getUserById,
    createUser, updateUser, deleteUser
} = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes (require authentication)
router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUserById);
router.post('/', authMiddleware, createUser);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);
router.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: "Welcome!", user: req.user });
});

module.exports = router;
