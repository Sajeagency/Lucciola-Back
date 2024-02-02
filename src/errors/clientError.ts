import { ERROR } from "../constants/errorName";
import CustomError from "./customError";

export default class ClientError extends CustomError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
    this.name = ERROR.CLIENT_ERROR;
    Error.captureStackTrace(this, this.constructor);
  }
}
