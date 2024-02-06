import { NextFunction, Response } from "express";
import { CustomRequest } from "../types/custom.types";
import handleRegistrationError from "../utils/handleRegistrationError";
import { CommentsService } from "../services/commentsService";
import { sendResponse } from "../utils/sendResponse";
import { HTTP_STATUS } from "../constants/httpStatusCode";

export const getCommentCtrl = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await CommentsService.getComments();
    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    handleRegistrationError(error, res, next);
  }
};
export const postCommentsCtrl = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { comment, postId } = req.body;
    const user = req.user;
    const data = await CommentsService.createComment(user.id, postId, comment);
    sendResponse(res, HTTP_STATUS.CREATED, data);
  } catch (error) {
    handleRegistrationError(error, res, next);
  }
};

export const updateCommentsCtrl = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { commentId, comment } = req.body;
    const data = await CommentsService.updateComment(commentId, comment);
    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    handleRegistrationError(error, res, next);
  }
};

export const deleteCommentsCtrl = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { commentId } = req.body;

    const data = await CommentsService.deleteComment(commentId);
    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    handleRegistrationError(error, res, next);
  }
};
