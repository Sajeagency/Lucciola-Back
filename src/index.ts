import { PrismaClient } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import router from "./Routes";
import passport from "passport";
import { configurePassport } from "./services/passportService";
import { sendErrorResponse } from "./utils/sendErrorResponse";
import { Session } from "express-session";

import dotenv from "dotenv";
dotenv.config();
const prisma = new PrismaClient();
import bodyParser from "body-parser";
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5433;
configurePassport();
app.use(passport.initialize());
app.use("/", router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { statusCode, message } = err;
  console.log("--->", err);
  sendErrorResponse(res, statusCode, message);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
