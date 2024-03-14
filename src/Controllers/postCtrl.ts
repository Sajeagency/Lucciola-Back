import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpStatusCode";
import { PostService } from "../services/postService";
import { CustomRequest } from "../types/custom.types";
import handleRegistrationError from "../utils/handleRegistrationError";
import { sendResponse } from "../utils/sendResponse";
import { ICreatePost } from "../types/post.types";

export const getPostCtrl = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = PostService.getPosts();
    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    handleRegistrationError(error, res, next);
  }
};

export const createPostCtrl = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, typePost } = req.body;
    const user = req.user;
    const pathImage = req.file && req.file.path;
    const postData: ICreatePost = {
      userId: user.id,
      title,
      description,
      typePost,
      pathImage,
    };
    const data = await PostService.createPost(postData, user.role);
    sendResponse(res, HTTP_STATUS.CREATED, { data });
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
    const deleted_post = await PostService.deletePost(+postId, req.user.role);
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
    const updatedPost = await PostService.updatePost(+postId);
    sendResponse(res, HTTP_STATUS.OK, updatedPost);

    sendResponse(res, HTTP_STATUS.OK, updatedPost);
  } catch (error) {
    handleRegistrationError(error, res, next);
  }
};
