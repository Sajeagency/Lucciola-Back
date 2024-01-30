import { Response } from "express";

export const sendResponse = (res: Response, statusCode: number, data: {}) => {
  res.status(statusCode).json({
    error: false,
    statusCode,
    ...data,
  });
};
