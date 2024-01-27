import { PrismaClient } from "@prisma/client";
import { error } from "console";
import ClientError from "../errors/clientError";
import { uploadImg } from "./cloudinary/cloudinaryService";
const prisma = new PrismaClient();

export class userService {
  static async updateUser(
    UserId: number,
    name: string,
    email: string,
    password: string,
    pathImage: string | undefined
  ) {
    let publidIdImgUrl;
    const user = await prisma.user.findUnique({
      where: {
        id: 3,
      },
    });
    console.log("userservice-->>", user);
    if (user?.publicIdImgUrl !== null) {
      publidIdImgUrl = user?.publicIdImgUrl;
    }
    const result = pathImage && (await uploadImg(pathImage, publidIdImgUrl));
    const userUpdate = await prisma.user.update({
      where: {
        id: 3,
      },
      data: {
        userName: name,
        email: email,
        password: password,
        publicIdImgUrl: result && result?.public_id,
        profilePictureURL: result && result?.secure_url,
      },
    });
    console.log("respuesta cloudinary", result);
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
