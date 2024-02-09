import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpStatusCode";
import { userService } from "../services/userService";
import { CustomRequest } from "../types/custom.types";
import handleRegistrationError from "../utils/handleRegistrationError";
import { sendResponse } from "../utils/sendResponse";

export const updateUserCtrl = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;
    const { id } = req.user;
    const pathProfilePicture = req.file && req.file.path;
    if (!pathProfilePicture) {
      throw new Error("Profile picture is required");
    }
    const user = await userService.updateUser(id, name, pathProfilePicture);
    return sendResponse(res, HTTP_STATUS.OK, user);
  } catch (error: any) {
    console.log("---->", error);
    handleRegistrationError(error, res, next);
  }
};
export const deleteUserCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const user = await userService.deleteUser(+userId);
    return sendResponse(res, HTTP_STATUS.CREATED, user);
  } catch (error: any) {
    handleRegistrationError(error, res, next);
  }
};
