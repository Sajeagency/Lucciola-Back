import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpStatusCode";
import ClientError from "../errors/clientError";
import { emailToResetService } from "../services/emailToResetService";

export const emailCtrl = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await emailToResetService.passwordReset(email);
    res
      .status(200)
      .json({ message: "Password reset email sent successfully." });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
