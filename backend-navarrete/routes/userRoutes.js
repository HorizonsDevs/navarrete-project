const express = require('express');
const { register, login, getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: "Welcome!", user: req.user });
});

module.exports = router;
