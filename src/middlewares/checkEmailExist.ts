import { PrismaClient, User } from "@prisma/client";
import { NextFunction, Response } from "express";
import DbError from "../errors/clientError";
import CustomError from "../errors/customError";
import { CustomRequest } from "../types/custom.types";
const prisma = new PrismaClient();

export const checkEmailExist = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const email = req.body.email;
    const user: User | null = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new DbError("user does not exist", 404);
    }
    req.user = user;
    next();
  } catch (error: any) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};
