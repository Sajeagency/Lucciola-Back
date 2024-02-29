import { Router } from "express";
import {
  deletePostCtrl,
  getPostCtrl,
  updatePostCtrl,
  createPostCtrl,
} from "../Controllers/postCtrl";
import { upload } from "../config/multer";
import checkUserAuth from "../middlewares/checkUserAuth.middleware";
import { checkRoleAuth } from "../middlewares/checkRoleAuth.middleware";

const router = Router();
router.get("/", getPostCtrl);
router.delete("delete-post/:postId", deletePostCtrl);
router.put("update-post/:postId", updatePostCtrl);
router.post(
  "/create-post",
  checkUserAuth,
  checkRoleAuth(["admin"]),
  upload.single("image"),
  createPostCtrl,
);
export default router;
