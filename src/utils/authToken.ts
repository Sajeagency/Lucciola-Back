import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;
export const generateToken = (id: string | number, role: string) => {
  //genera token con jesonwebtoken
  const token = jwt.sign({ id, role }, process.env.JWT_SECRET || "");
  return token;
};
export const verifyToken = (token: string) => {
  //verifica token con jesonwebtoken
  const decoded = jwt.verify(token, JWT_SECRET || "");
  return decoded;
};
