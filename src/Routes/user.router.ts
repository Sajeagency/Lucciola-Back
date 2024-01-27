import { Router } from "express";
import { deleteUserCtrl, updateUserCtrl } from "../Controllers/userCtrl";
import { upload } from "../config/multer";
const router = Router();

router.delete("/delete/:userId", deleteUserCtrl);
router.put("/update/:userId", upload.single('profilePicture'), updateUserCtrl);
export default router;
