const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// 🔹 FIXED: Ensure the route correctly calls the controller
router.get('/orders', authMiddleware.protect, userController.getUserOrders);

router.get("/", authMiddleware.protect, authMiddleware.adminOnly, userController.getAllUsers);
router.get("/:id", authMiddleware.protect, userController.getUserById);
router.post("/", authMiddleware.protect, authMiddleware.adminOnly, userController.createUser);
router.put("/:id", authMiddleware.protect, userController.updateUser);
router.delete("/:id", authMiddleware.protect, authMiddleware.adminOnly, userController.deleteUser);



router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
