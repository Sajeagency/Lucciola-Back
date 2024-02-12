import { Router } from "express";

import { emailCtrl } from "../Controllers/emailCtrl";

const router = Router();
router.post("/reset/password-email", emailCtrl);
export default router;
