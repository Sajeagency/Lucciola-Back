import { PrismaClient } from "@prisma/client";
import { upload } from "../config/multer";
import { uploadImg } from "./cloudinary/cloudinaryService";
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
    typeOf: string,
    image?: string
  ) {
    if (image) {
      const data = await prisma.post.create({
        data: {
          user_id: userId,
          title,
          description,
          typeOf,
          timestamp: new Date(),
        },
      });
      const imageUpload = await uploadImg(image, undefined);
      const imgUrl = await prisma.media.create({
        data: {
          imageUrl: imageUpload.secure_url,
          publicId: imageUpload.public_id,
          post_id: data.id,
          user_id: userId,
        },
      });
      return { message: "post creado" };
    } else {
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
