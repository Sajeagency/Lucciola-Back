import { NextFunction, Response, Request } from "express";
import { CustomRequest } from "../types/custom.types";
import handleRegistrationError from "../utils/handleRegistrationError";
import { postService } from "../services/postService";
import { sendResponse } from "../utils/sendResponse";
import { HTTP_STATUS } from "../constants/httpStatusCode";

export const getPostCtrl = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = postService.getPosts();
    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    handleRegistrationError(error, res, next);
  }
};

export const createPostCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, userId, description, typeOf } = req.body;
    const data = await postService.createPost(
      userId,
      title,
      description,
      typeOf
    );
    sendResponse(res, HTTP_STATUS.CREATED, data);
  } catch (error) {
    handleRegistrationError(error, res, next);
  }
};

export const deletePostCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const deleted_post = await postService.deletePost(+postId);
    return sendResponse(res, HTTP_STATUS.CREATED, deleted_post);
  } catch (error: any) {
    handleRegistrationError(error, res, next);
  }
};

export const updatePostCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const updatedPost = await postService.updatePost(+postId);
    sendResponse(res, HTTP_STATUS.OK, updatedPost);
  } catch (error) {
    handleRegistrationError(error, res, next);
  }
};
