import { Router } from "express";
import { getCommentCtrl, postCommentsCtrl } from "../Controllers/commentsCtrl";
import checkUserAuth from "../middlewares/checkUserAuth.middleware";
const router = Router();
router.get("/", getCommentCtrl);
router.post("/create-comment", checkUserAuth, postCommentsCtrl);
export default router;
