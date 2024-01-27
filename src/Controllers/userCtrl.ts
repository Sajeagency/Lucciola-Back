import { Request,NextFunction,Response } from "express";
import { userService } from "../services/userService";
import { HTTP_STATUS } from "../constants/httpStatusCode";
import handleRegistrationError from "../utils/handleRegistrationError";
import { sendResponse } from "../utils/sendResponse";



export const deleteUserCtrl = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.params;
      const user = await userService.deleteUser(+userId);
      return sendResponse(res, HTTP_STATUS.CREATED, user);
    } catch (error: any) {
      handleRegistrationError(error, res, next);
    }
  };