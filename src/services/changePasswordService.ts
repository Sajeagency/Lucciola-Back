import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export class changePassword {
  static async changePassword(req: Request, res: Response) {
    const token=req.query
    console.log(req.query);
    const {newPassword} = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ error: "Token and newPassword are required" });
    }
   
     const user =  await  prisma.user.findFirst({
      
      where: {

        resetToken: String(token),
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

