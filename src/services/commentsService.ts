import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();
export class CommentsService {
  static async getComments() {
    const data = await prisma.comments.findMany();

    return { data };
  }
  static async createComment(userId: number, postId: number, comment: string) {
    const data = await prisma.comments.create({
      data: {
        user_id: userId,
        post_id: postId,
        comment,
        timestamp: new Date(),
      },
    });
    return { data };
  }
  static async deleteComment(commentId: number) {
    const data = await prisma.comments.delete({
      where: {
        id: commentId,
      },
    });
    return { data };
  }

  static async updateComment(commentId: number, comment: string) {
    const data = await prisma.comments.update({
      where: {
        id: commentId,
      },
      data: {
        comment,
        timestamp: new Date(),
      },
    });
    return { data };
  }

  static async getCommentsByPostId(postId: number) {
    const data = await prisma.comments.findMany({
      where: {
        post_id: postId,
      },
    });
    return { data };
  }
}
