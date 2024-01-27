import { PrismaClient } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import router from "./routes";
import { sendErrorResponse } from "./utils/sendErrorResponse";
const prisma = new PrismaClient();

const app = express();

const port = process.env.PORT || 5432;
app.use(express.json());
app.use(morgan("dev"));
app.use("/", router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { statusCode, message } = err;
  sendErrorResponse(res, statusCode, message);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
