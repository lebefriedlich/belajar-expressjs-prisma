// src/repositories/PostRepository.js
const prisma = require('../utils/PrismaClient');

class PostRepository {
  static async getAllPosts() {
    return await prisma.post.findMany();
  }

  static async findTitle(title) {
    return await prisma.post.findFirst({
      where: { title: title }
    });
  }

  static async findTitleExcludeId(title, id) {
    return await prisma.post.findFirst({
      where: { title: title, id: { not: Number(id) } }
    });
  }

  static async getPostById(id) {
    return await prisma.post.findUnique({
      where: { id: Number(id) }
    });
  }

  static async createPost(data) {
    return await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        userId: data.userId,
      }
    });
  }

  static async updatePost(id, data) {
    return await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title: data.title,
        content: data.content,
        userId: data.userId,
      }
    });
  }

  static async deletePost(id) {
    return await prisma.post.delete({
      where: { id: Number(id) }
    });
  }
}

module.exports = PostRepository;
