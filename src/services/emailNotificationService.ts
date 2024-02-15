import { PrismaClient } from "@prisma/client";
import { HTTP_STATUS } from "../constants/httpStatusCode";
import ClientError from "../errors/clientError";
import * as crypto from "crypto";
import jwt from 'jsonwebtoken'
import { createTransportNodeMailer } from "../config/nodemailer";
const prisma = new PrismaClient();

export class EmailNotificationService {
  static async sendEmail(to: string | string[], subject: string, html: string) {
    const transporter = await createTransportNodeMailer();
    const info = await transporter.sendMail({
      to,
      subject,
      html,
    });
    return info;
  }
  static async passwordReset(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new ClientError("User not found", HTTP_STATUS.NOT_FOUND);
    }

    /* const passwordExpiry: string | undefined =
      process.env.RESET_PASSWORD_EXPIRY;

    if (passwordExpiry === undefined) {
      throw new Error(
        "RESET_PASSWORD_EXPIRY is not defined in the environment variables",
      );
    } */

    /*   const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiry = Date.now() + parseInt(passwordExpiry);
    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpiry },
    });
 */
    const payload = {
      id: 1,
      username: 'usuario',
      role: 'admin',
    };
    
    const secret = 'clave-secreta';
    
    const token = jwt.sign(payload, secret, {
      algorithm: 'HS256',
      expiresIn: '1m',
    });
    
    
    const resetLink = `http://localhost:3200/email/reset-password/${token}`;

    const info = await this.sendEmail(
      "juanusca45@gmail.com",
      "restear password",
      `<p>Hola${user.userName}</p>
  <p>Padiste un cambio de contraseña.Hace click abajo para cambiarla</p>
  <a href="${resetLink}">click aca</a>
 <p>Si no hiciste el pedido para cambiar la contraseña , ignora este email</p>`
    );

    return { data: info };
  }
}
