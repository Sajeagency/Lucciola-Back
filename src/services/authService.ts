import { HTTP_STATUS } from "../constants/httpStatusCode";
import ClientError from "../errors/clientError";
import { comparePassword, hashPassword } from "../utils/bcryp";
import { generateToken } from "../utils/authToken";
import { PrismaClient } from "@prisma/client";
import { OAuth2Client } from "google-auth-library";
const prisma = new PrismaClient();
const client = new OAuth2Client();
const { ID_CLIENT_GOOGLE } = process.env;
export class AuthService {
  static async register(userName: string, email: string, password: string) {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      throw new ClientError("user already exists", HTTP_STATUS.BAD_REQUEST);
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: { userName, email, password: hashedPassword },
    });

    const token = generateToken(newUser.id, newUser.userRole);

    return { data: newUser, token };
  }
  static async login(email: string, password: string) {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      throw new ClientError("user does not exist", HTTP_STATUS.BAD_REQUEST);
    }

    if (existingUser.password === null) {
      throw new ClientError(
        "password not set for the user",
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
      );
    }

    const passwordMatch = await comparePassword(
      password,
      existingUser.password,
    );

    if (!passwordMatch) {
      throw new ClientError("incorrect password", HTTP_STATUS.UNAUTHORIZED);
    }

    const token = generateToken(existingUser.id, existingUser.userRole);

    return { data: existingUser, token };
  }

  static async googleLogin(googleToken: string) {
    const tiket = await client.verifyIdToken({
      idToken: googleToken,
      audience: ID_CLIENT_GOOGLE,
    });

    const payload = tiket.getPayload();

    const googleUserId = payload?.sub;

    if (!googleUserId) {
      throw new ClientError("Invalid Google token", HTTP_STATUS.UNAUTHORIZED);
    }

    const existingUser = await prisma.user.findUnique({
      where: { googleId: googleUserId },
    });

    if (!existingUser && payload.name && payload.email) {
      const newUser = await prisma.user.create({
        data: {
          userName: payload?.name,
          email: payload?.email,
          googleId: googleUserId,
        },
      });

      const token = generateToken(newUser.id, newUser.userRole);

      return { data: newUser, token };
    }

    const token = generateToken(existingUser?.id!, existingUser?.userRole!);

    return { data: existingUser, token };
  }
}
