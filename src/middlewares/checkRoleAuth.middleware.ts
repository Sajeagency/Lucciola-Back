import { NextFunction, Response } from "express";
import { CustomRequest } from "../types/custom.types";
import { HTTP_STATUS } from "../constants/httpStatusCode";
import ClientError from "../errors/clientError";
import handleRegistrationError from "../utils/handleRegistrationError";

export const checkRoleAuth =
  (role: string[]) =>
  (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const { role: userRole } = req.user;
      if (!role.includes(userRole)) {
        throw new ClientError("unauthorized", HTTP_STATUS.UNAUTHORIZED);
      }
      next();
    } catch (error: any) {
      handleRegistrationError(error, res, next);
    }
  };
