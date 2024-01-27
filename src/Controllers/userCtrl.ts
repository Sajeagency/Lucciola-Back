import { Request, NextFunction, Response } from "express";
import { userService } from "../services/userService";
import { HTTP_STATUS } from "../constants/httpStatusCode";
import handleRegistrationError from "../utils/handleRegistrationError";
import { sendResponse } from "../utils/sendResponse";

export const updateUserCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, name, email, password } = req.body;
  const pathProfilePicture = req.file && req.file.path

   
    const user = await userService.updateUser(
      userId,
      name,
      email,
      password,
      pathProfilePicture
    );
    return sendResponse(res, HTTP_STATUS.CREATED, user);
  } catch (error: any) {
    console.log("---->",error)
    handleRegistrationError(error, res, next);
  }
};
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
