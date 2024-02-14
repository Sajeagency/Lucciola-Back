import { Router } from "express";

import { emailCtrl } from "../Controllers/emailCtrl";

const router = Router();
router.post("/reset/pass-email", emailCtrl);
export default router;
