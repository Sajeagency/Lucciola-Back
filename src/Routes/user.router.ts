import { Router } from "express";
import { deleteUserCtrl } from "../Controllers/userCtrl";

const router=Router();

router.delete("/delete/:userId",deleteUserCtrl);
export default router;