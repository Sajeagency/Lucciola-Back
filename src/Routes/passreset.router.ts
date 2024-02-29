import  {Router}  from "express";
import { changePasswordCtrl} from "../Controllers/passwordResetCtrl";

const router=Router();

router.get("/reset/password",changePasswordCtrl);
export default router;