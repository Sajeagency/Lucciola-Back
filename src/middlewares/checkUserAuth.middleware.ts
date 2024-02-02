import { NextFunction, Response } from "express";
import ClientError from "../errors/clientError";
import { CustomRequest } from "../types/custom.types";
import { verifyToken } from "../utils/authToken";
import handleRegistrationError from "../utils/handleRegistrationError";
import { HTTP_STATUS } from "../constants/httpStatusCode";
const checkUserAuth = (
  req: CustomRequest,
  res: Response,
  Next: NextFunction,
) => {
  try {
    const headerAuthorization = req.headers.authorization;
    if (!headerAuthorization?.includes("Bearer")) {
      throw new ClientError("unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const token = headerAuthorization?.split(" ")[1];
    const user = verifyToken(token);
    req.user = user;
    Next();
  } catch (error) {
    handleRegistrationError(error, res, Next);
  }
};
export default checkUserAuth;
