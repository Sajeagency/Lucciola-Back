import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpStatusCode";
import ClientError from "../errors/clientError";
import { EmailNotificationService } from "../services/emailNotificationService";
import { sendResponse } from "../utils/sendResponse";
import handleRegistrationError from "../utils/handleRegistrationError";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Prisma, PrismaClient } from "@prisma/client";
const {user}= new PrismaClient()
interface  Itoken extends JwtPayload {
  id: number,
  username: string,
  role: string,
  iat: number,
  exp: number
}
export const emailCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    console.log("--->", email);
    const data = await EmailNotificationService.passwordReset(email);
    
    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error: any) {
    console.log("--->error", error);
    handleRegistrationError(error, res, next);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {token}=req.params
    if(!token){
      throw new ClientError('no token',404)
    }
  const data: Itoken | any= jwt.verify(token,'clave-secreta')
    
     const userUpdate =  await user.update({
      where: {id : data.id  },
      data: { password:"1456789" },
    });
     
   console.log("--->>>>",data.id)
    sendResponse(res,HTTP_STATUS.OK,{token})
  } catch (error) {
    handleRegistrationError(error,res,next)
  }
};
