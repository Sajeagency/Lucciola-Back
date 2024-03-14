import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function handleFacebookCallback(req: Request, res: Response) {
  
  const user = req.user as { id: number, userName: string };
  const token = jwt.sign({ userId: user.id, userName: user.userName }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  
  res.json({ token });
}
