import { PrismaClient } from "@prisma/client";
import { error } from "console";
import ClientError from "../errors/clientError";
const prisma = new PrismaClient();

export class userService {
  static async deleteUser(UserId: number) {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: UserId,
      },
    });

    if (!existingUser) {
      throw new ClientError("User doesn't exist", 404);
    }
    const user = prisma.user.delete({
      where: {
        id: UserId,
      },
    });

    return { data: user };
  }
}
