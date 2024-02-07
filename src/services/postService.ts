import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class postService {
  static async getPosts() {
    const data = prisma.post.findMany();

    return { data };
  }

  static async createPost(
    userId: number,
    title: string,
    description: string,
    typeOf: string
  ) {
    const data = await prisma.post.create({
      data: {
        user_id: userId,
        title,
        description,
        typeOf,
        timestamp: new Date(),
      },
    });
    return { data };
  }

  static async deletePost(postId: number) {
    const data = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return { data };
  }

  static async updatePost(postId: number) {
    const data = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        timestamp: new Date(),
      },
    });
    return { data };
  }
}
