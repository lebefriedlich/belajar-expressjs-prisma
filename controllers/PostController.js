// src/controllers/PostController.js
const PostService = require("../services/PostService");
const Validator = require("../helpers/Validator");

class PostController {
  static async getAllPosts(req, res) {
    try {
      const posts = await PostService.getAllPosts();
      res.status(200).json({
        status_code: 200,
        message: "Posts retrieved successfully",
        data: posts,
      });
    } catch (error) {
      res.status(500).json({
        status_code: 500,
        error: "Internal Server Error",
      });
    }
  }

  static async getPostById(req, res) {
    const { id } = req.params;
    try {
      const post = await PostService.getPostById(id);
      if (!post) {
        return res.status(404).json({
          status_code: 404,
          error: "Post not found",
        });
      }
      res.status(200).json({
        status_code: 200,
        message: "Post retrieved successfully",
        data: post,
      });
    } catch (error) {
      res.status(500).json({
        status_code: 500,
        error: "Internal Server Error",
      });
    }
  }

  static async createPost(req, res) {
    const { title, content } = req.body;
    const userId = req.user.id; // Assuming user ID is available in req.user
    const validator = await Validator.make(
      { title, content, userId },
      {
        title: "required|string",
        content: "required|string",
      }
    );
    if (validator.fails()) {
      return res.status(422).json({
        status_code: 422,
        errors: validator.errors.all(),
      });
    }
    try {
      const newPost = await PostService.createPost({ title, content, userId });
      res.status(201).json({
        status_code: 201,
        message: "Post created successfully",
        data: newPost,
      });
    } catch (error) {
      res.status(500).json({
        status_code: 500,
        error: "Internal Server Error",
      });
    }
  }

  static async updatePost(req, res) {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user.id; // Assuming user ID is available in req.user
    const validator = await Validator.make(req.body, {
      title: "required|string",
      content: "required|string",
    });
    if (validator.fails()) {
      return res.status(422).json({
        status_code: 422,
        errors: validator.errors.all(),
      });
    }
    try {
      const updatedPost = await PostService.updatePost(id, {
        title,
        content,
        userId,
      });
      if (!updatedPost) {
        return res.status(404).json({
          status_code: 404,
          error: "Post not found",
        });
      }
      res.status(200).json({
        status_code: 200,
        message: "Post updated successfully",
        data: updatedPost,
      });
    } catch (error) {
      res.status(500).json({
        status_code: 500,
        error: "Internal Server Error",
      });
    }
  }

  static async deletePost(req, res) {
    const { id } = req.params;
    try {
      await PostService.deletePost(id);
      res.status(200).json({
        status_code: 200,
        message: "Post deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        status_code: 500,
        error: "Internal Server Error",
      });
    }
  }
}

module.exports = PostController;
