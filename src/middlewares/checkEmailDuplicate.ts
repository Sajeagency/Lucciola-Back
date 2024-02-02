import { PrismaClient, User } from "@prisma/client";
import { NextFunction, Response } from "express";
import CustomError from "../errors/customError";
import DbError from "../errors/clientError";
import { CustomRequest } from "../types/custom.types";
const prisma = new PrismaClient();

export const checkEmailDuplicate = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const email = req.body.email;
    const user: User | null = await prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      throw new DbError("User already exists", 409);
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
