import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextFunction, Response } from "express";
import ClientError from "../errors/clientError";

const handleRegistrationError = (
    error: any,
    res: Response,
    next: NextFunction
  ) => {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error("Error conocido de Prisma:", error.message);
      return res.status(500).json({ error: "Error al procesar la solicitud." });
    }
  
    if (error instanceof ClientError) {
      console.error("Error personalizado:", error.message);
      return next(error);
    }
  
    console.error("Error desconocido:", error.message);
    return res.status(500).json({ error: "Error al procesar la solicitud." });
  };
  export default handleRegistrationError