import { Router } from "express";
import { deleteUserCtrl, updateUserCtrl } from "../Controllers/userCtrl";
import { upload } from "../config/multer";
import checkUserAuth from "../middlewares/checkUserAuth.middleware";
const router = Router();

router.delete("/delete/:userId", deleteUserCtrl);
router.put(
  "/update",
  checkUserAuth,
  upload.single("profilePicture"),
  updateUserCtrl,
);
export default router;
