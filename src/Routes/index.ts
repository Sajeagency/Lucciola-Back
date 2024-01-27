import express, { Router } from "express";
import fs from "fs";
const router: Router = express.Router();
const pathRouter: string = __dirname;
const removeExtencion = (fileName: string) => {
  return fileName.split(".").shift();
};
fs.readdirSync(pathRouter).filter((file) => {
  const name = removeExtencion(file);
  if (name !== "index") {
    import(`./${file}`).then((module) => {
      router.use(`/${name}`, module.default);
    });
  }
});

export default router;
