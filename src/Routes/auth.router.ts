import { Router } from "express";
import {
  googleLoginCtrl,
  loginCtrl,
  registerCtrl,
} from "../Controllers/authCtrl";
import { validateFieldLogin } from "../validator/validateFieldLogin";
import { validateFieldRegister } from "../validator/validateFieldRegister";

const router = Router();
router.post("/login", validateFieldLogin, loginCtrl);
router.post("/register", validateFieldRegister, registerCtrl);
router.post("/google-login", googleLoginCtrl);
export default router;
