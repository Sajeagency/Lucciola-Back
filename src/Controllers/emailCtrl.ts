import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpStatusCode";
import ClientError from "../errors/clientError";
import { EmailNotificationService } from "../services/emailNotificationService";

export const emailCtrl = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const { message, resetToken } = await EmailNotificationService.passwordReset(email);
    res.status(HTTP_STATUS.OK).json({ message, resetToken });
  } catch (error: any) {
    res.status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};