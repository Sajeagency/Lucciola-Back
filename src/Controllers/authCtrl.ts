import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpStatusCode";
import ClientError from "../errors/clientError";
import { AuthService } from "../services/authService";
import { sendResponse } from "../utils/sendResponse";


export const registerCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, password, email } = req.body;
    const newUser = await AuthService.register(name, email, password);
    return sendResponse(res, HTTP_STATUS.CREATED, newUser);
  } catch (error: any) {
    handleRegistrationError(error, res, next);
  }
};

export const loginCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const data = await AuthService.login(email, password);
    return sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    handleRegistrationError(error, res, next);
  }
};

export const googleLoginCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;
    if (!token) {
      throw new ClientError("unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const data = await AuthService.googleLogin(token);
    return sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    handleRegistrationError(error, res, next);
  }
};

const handleRegistrationError = (
  error: any,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof PrismaClientKnownRequestError) {
    console.error("Error conocido de Prisma:", error.message);
    return res.status(500).json({ error: "Error al procesar la solicitud." });
  }

  if (error instanceof ClientError) {
    console.error("Error personalizado:", error.message);
    return next(error);
  }

  console.error("Error desconocido:", error.message);
  return res.status(500).json({ error: "Error al procesar la solicitud." });
};
