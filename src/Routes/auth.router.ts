import { Router } from "express";
import {
  googleLoginCtrl,
  loginCtrl,
  registerCtrl,
} from "../Controllers/authCtrl";
import { handleFacebookCallback } from "../Controllers/authFaceCrtl";
import passport from 'passport';
import { validateFieldLogin } from "../validator/validateFieldLogin";
import { validateFieldRegister } from "../validator/validateFieldRegister";

const router = Router();
router.post("/login", validateFieldLogin, loginCtrl);
router.post("/register", validateFieldRegister, registerCtrl);
router.post("/google-login", googleLoginCtrl);
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  handleFacebookCallback
);
export default router;
