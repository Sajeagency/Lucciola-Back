import { Router } from "express";
import {
  deletePostCtrl,
  getPostCtrl,
  updatePostCtrl,
} from "../Controllers/postCtrl";

const router = Router();
router.get("/", getPostCtrl);
router.delete("delete-post/:postId", deletePostCtrl);
router.put("update-post/:postId", updatePostCtrl);
export default router;
