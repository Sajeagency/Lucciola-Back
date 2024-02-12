import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export class changePassword {
  static async changePassword(req: Request, res: Response) {
    const { token, newPassword } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gte: new Date().getTime(),
        },
      },
    });
    if (!user) {
      throw new Error("Invalid or expired token");
    }
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: newPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    res.json({ message: "Password reset successful" });
  }
}
