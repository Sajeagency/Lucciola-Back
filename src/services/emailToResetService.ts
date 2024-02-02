import { PrismaClient } from "@prisma/client";
import { HTTP_STATUS } from "../constants/httpStatusCode";
import ClientError from "../errors/clientError";
import * as crypto from "crypto";
import { sendEmail } from "../utils/sendEmail";
const prisma = new PrismaClient();

export class emailToResetService {
  static async passwordReset(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new ClientError("User not found", HTTP_STATUS.NOT_FOUND);
    }

    const passwordExpiry: string | undefined =
      process.env.RESET_PASSWORD_EXPIRY;

    if (passwordExpiry === undefined) {
      throw new Error(
        "RESET_PASSWORD_EXPIRY is not defined in the environment variables"
      );
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiry = Date.now() + parseInt(passwordExpiry);
    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpiry },
    });

    const resetLink = `http://localhost/reset-password?token=${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Recuperacion de Contraseña",
      html: `
<p>Hola${user.userName}</p>
<p>Padiste un cambio de contraseña.Hace click abajo para cambiarla</p>
<a href="${resetLink}"></a>
<p>Si no hiciste el pedido para cambiar la contraseña , ignora este email</p>


`,
    });
    return { message: "password reset email enviado " };
  }
}
