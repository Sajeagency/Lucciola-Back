import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "../utils/validateResult";
export const validateFieldRegister = [
  check("name").not().isEmpty().withMessage("name is required"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is not valid"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
  (req: Request, res: Response, next: NextFunction) =>
    validateResult(req, res, next),
];
