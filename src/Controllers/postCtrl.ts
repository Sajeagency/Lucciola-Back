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
  next: NextFunction,
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
  next: NextFunction,
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
    const data = await PostService.createPost(postData, user.userRole);
    sendResponse(res, HTTP_STATUS.CREATED, { data });
  } catch (error) {
    handleRegistrationError(error, res, next);
  }
};

export const deletePostCtrl = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { postId } = req.params;
    const userRole = req.user?.userRole;

    if (userRole !== "admin") {
      throw new Error("Only admin users can delete posts");
    }

    const deletedPost = await PostService.deletePost(+postId, userRole);
    return sendResponse(res, HTTP_STATUS.OK, deletedPost);
  } catch (error) {
    handleRegistrationError(error, res, next);
  }
};

export const updatePostCtrl = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { postId } = req.params;
    const { title, description, typePost } = req.body;

    const updatedPostData: Partial<ICreatePost> = {
      title,
      description,
      typePost
    };

    const updatedPost = await PostService.updatePost(+postId, updatedPostData, req.user?.userRole);
    sendResponse(res, HTTP_STATUS.OK, updatedPost);
  } catch (error) {
    handleRegistrationError(error, res, next);
  }
};