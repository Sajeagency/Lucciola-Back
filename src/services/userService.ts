import { PrismaClient } from "@prisma/client";
import ClientError from "../errors/clientError";
import { uploadImg } from "./cloudinary/cloudinaryService";
import fs from "fs-extra";
const prisma = new PrismaClient();

export class userService {
  static async updateUser(userId: number, name: string, pathImage: string) {
    let publidIdImgUrl;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user?.publicIdImgUrl !== null) {
      publidIdImgUrl = user?.publicIdImgUrl;
    }
    const result = await uploadImg(pathImage, publidIdImgUrl);
    await fs.unlink(pathImage);
    const userUpdate = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        userName: name,
        publicIdImgUrl: result && result?.public_id,
        profilePictureURL: result && result?.secure_url,
      },
    });

    return { data: userUpdate };
  }

  static async deleteUser(UserId: number) {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: UserId,
      },
    });

    if (!existingUser) {
      throw new ClientError("User doesn't exist", 404);
    }

    const user = await prisma.user.delete({
      where: {
        id: UserId,
      },
    });

    return { data: user };
  }
}
