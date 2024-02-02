import { Response } from "express";
interface IErrorResponse {
  error: boolean;
  status: number;
  message: string;
  details?: string;
}
export const sendErrorResponse = (
  res: Response,
  status: number = 500,
  message: string,
  details?: string,
) => {
  const errorResponse: IErrorResponse = {
    error: true,
    status,
    message,
  };
  if (details) {
    errorResponse.details = details;
  }
  return res.status(status).json(errorResponse);
};
