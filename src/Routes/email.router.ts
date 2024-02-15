import { Router } from "express";

import { emailCtrl, resetPassword } from "../Controllers/emailCtrl";

const router = Router();
router.post("/reset/password", emailCtrl);
router.get("/reset-password/:token", resetPassword );
export default router;
