import { Request, Response } from "express";
import { changePassword } from "../services/changePasswordService";

export class changePasswordCtrl {
  static async changePassword(req: Request, res: Response) {
    try {
        const { token, newPassword } = req.body; 
        await changePassword.changePassword(token, newPassword);

      res.json({ message: "Password reset successful" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
