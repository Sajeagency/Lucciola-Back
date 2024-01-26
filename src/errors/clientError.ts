import  CustomError  from "./customError";

export default class ClientError extends CustomError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
    this.name="ClientError";
    Error.captureStackTrace(this, this.constructor);
  }
}
