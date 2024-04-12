import { PrismaClient, TypeRoleEnum } from "@prisma/client";
import { ICreatePost } from "../types/post.types";
import { IUpdatePost } from "../types/post.types";
import { getEmailUsers } from "../utils/getEmailUsers.utils";
import { uploadImg } from "./cloudinary/cloudinaryService";
import { EmailNotificationService } from "./emailNotificationService";
import fs from "fs-extra";
const prisma = new PrismaClient();

export class PostService {
  static async getPosts() {
    const data = prisma.post.findMany();

    return { data };
  }

  static async createPost(postdata: ICreatePost) {

    const { description, pathImage, title, typePost, userId } = postdata;

    const postData = { title, description, typePost, userId };

    const newPost = await prisma.post.create({
      data: { ...postData },
    });
    const {id:postId}=newPost
    if (pathImage) {
      const { secure_url: imageUrl, public_id: publicId } =
        await uploadImg(pathImage);
      await fs.unlink(pathImage);
      const mediaData = { userId, postId, imageUrl, publicId };
      await prisma.media.create({ data: { ...mediaData } });
    }

    if (typePost === "evento") {
      const emails = await getEmailUsers();
      const notificationSend = await EmailNotificationService.sendEmail(
        emails,
        "new post",
        `<strong>${title}</strong>`
      );

      return {
        emails: notificationSend.envelope.to,
        message: "publication created and notification sent",
      };
    }

    return { newPost };
  }

  static async deletePost(postId: number) {

    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
        throw new Error('Post not found');
    }

    const data = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return { data };
  }

  static async updatePost(
    postId: number,
    updatedPostData: IUpdatePost,
  ) {
    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!existingPost) {
      throw new Error("Post not found");
    }

    const { description, pathImage, title, typePost } = updatedPostData;

    const postData = { title, description, pathImage,typePost };

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: { ...postData },
    });

    return { message: "Post updated successfully", data: updatedPost };
  }
}