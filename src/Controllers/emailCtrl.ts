import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpStatusCode";
import ClientError from "../errors/clientError";
import { EmailNotificationService } from "../services/emailNotificationService";

export const emailCtrl = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await EmailNotificationService.passwordReset(email);
    res
      .status(200)
      .json({ message: "Password reset email sent successfully." });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
