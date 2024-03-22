import { PrismaClient } from "@prisma/client";
import { ICreatePost } from "../types/post.types";
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

  static async createPost(postdata: ICreatePost, userRole: string) {
    if (userRole !== "admin") {
      throw new Error("Only admin users can create posts");
    }
    const { description, pathImage, title, typePost, userId } = postdata;

    const postData = { title, description, typePost, userId };

    const { id: postId } = await prisma.post.create({
      data: { ...postData },
    });

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

    return { message: "publication created" };
  }

  static async deletePost(postId: number, userRole: string) {
    if (userRole !== "admin") {
      throw new Error("Only admin users can delete posts");
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
    updatedPostData: Partial<ICreatePost>,
    userRole: string
  ) {
    if (userRole !== "admin") {
      throw new Error("Only admin users can update posts");
    }
    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!existingPost) {
      throw new Error("Post not found");
    }

    const { description, pathImage, title, typePost, userId } = updatedPostData;

    const postData = { title, description, pathImage,typePost, userId };

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: { ...postData },
    });

    return { message: "Post updated successfully", data: updatedPost };
  }
}