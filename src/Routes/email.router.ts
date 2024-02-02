import { Router } from "express";

import { emailCtrl } from "../Controllers/emailCtrl";

const router = Router();
router.post("/reset/password",emailCtrl);
export default router;