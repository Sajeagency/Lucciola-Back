import  {Router}  from "express";
import { changePasswordCtrl} from "../Controllers/passwordResetCtrl";

const router=Router();

router.post("/reset/password",changePasswordCtrl);
export default router;