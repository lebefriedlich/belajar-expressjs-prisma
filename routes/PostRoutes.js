// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const { protect } = require("../middlewares/AuthMiddleware");

router.get('/posts', PostController.getAllPosts);
router.get('/posts/:id', PostController.getPostById);
router.post('/posts', protect, PostController.createPost);
router.put('/posts/:id', protect, PostController.updatePost);
router.delete('/posts/:id', protect, PostController.deletePost);

module.exports = router;
