import { Router } from "express";
import {
  deletePostCtrl,
  getPostCtrl,
  updatePostCtrl,
  createPostCtrl,
} from "../Controllers/postCtrl";
import { upload } from "../config/multer";
import checkUserAuth from "../middlewares/checkUserAuth.middleware";

const router = Router();
router.get("/", getPostCtrl);
router.delete("delete-post/:postId", deletePostCtrl);
router.put("update-post/:postId", updatePostCtrl);
router.post(
  "/create-post",
  checkUserAuth,
  upload.single("image"),
  createPostCtrl,
);
export default router;
