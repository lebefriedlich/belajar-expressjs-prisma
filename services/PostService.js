// src/services/PostService.js
const PostRepository = require('../repositories/PostRepository');

class PostService {
  static async getAllPosts() {
    return await PostRepository.getAllPosts();
  }

  static async getPostById(id) {
    return await PostRepository.getPostById(id);
  }

  static async createPost(data) {
    const existingPost = await PostRepository.findTitle(data.title);

    if (existingPost) throw new Error("Post with this title already exists");
    
    return await PostRepository.createPost(data);
  }

  static async updatePost(id, data) {
    const existingPost = await PostRepository.findTitleExcludeId(data.title, id);

    if (existingPost) throw new Error("Post with this title already exists");
    
    return await PostRepository.updatePost(id, data);
  }

  static async deletePost(id) {
    return await PostRepository.deletePost(id);
  }
}

module.exports = PostService;
