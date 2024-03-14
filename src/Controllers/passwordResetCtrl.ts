import { Request, Response } from "express";
import { changePassword } from "../services/changePasswordService";

export const changePasswordCtrl = async (req: Request, res: Response) => {
  try {
    const token = req.query.token as string;
    const { newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ error: "Token and newPassword are required" });
    }

    await changePassword(req, res); 
  } catch (error: any) {
    
    res.status(400).json({ error: error.message });
  }
}