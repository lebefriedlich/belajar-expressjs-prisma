// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { protect } = require("../middlewares/AuthMiddleware");
const { authorizeRoles } = require("../middlewares/RoleMiddleware");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/users", protect, authorizeRoles("ADMIN"), AuthController.getAllUsers);

module.exports = router;
