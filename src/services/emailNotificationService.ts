import { PrismaClient } from "@prisma/client";
import { HTTP_STATUS } from "../constants/httpStatusCode";
import ClientError from "../errors/clientError";
import { sendEmail } from "../utils/sendEmail";
import { createTransportNodeMailer } from "../config/nodemailer";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface PasswordResetResult {
  message: string;
  resetToken?: string;
}


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

  static async passwordReset(email: string): Promise<PasswordResetResult> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw new ClientError("User not found", HTTP_STATUS.NOT_FOUND);
    }

    const passwordExpirySeconds: number = parseInt(process.env.RESET_PASSWORD_EXPIRY || "3600");

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: passwordExpirySeconds,
    });
    const resetTokenExpiry = new Date();
    resetTokenExpiry.setSeconds(resetTokenExpiry.getSeconds() + passwordExpirySeconds);
    await prisma.user.update({
        where: { id: user.id },
        data: { resetToken, resetTokenExpiry },
    });

    const resetLink = `http://localhost:5433/passreset/reset/password?token=${resetToken}`;

    await sendEmail({
        to: user.email,
        subject: "Recuperacion de Contraseña",
        html: `
            <p>Hola ${user.userName}</p>
            <p>Pediste un cambio de contraseña. Haz click <a href="${resetLink}">aquí</a> para cambiarla</p>
            <p>Si no hiciste el pedido para cambiar la contraseña, ignora este email</p>
        `,
    });

    return { message: "password reset email enviado ", resetToken };
}
}