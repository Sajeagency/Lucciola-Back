import { OAuth2Client } from "google-auth-library";
import nodemailer from "nodemailer";

const {
  ID_CLIENT_GMAIL_NODEMAILER,
  SECRET_GMAIL_NODEMAILER,
  REDIRECT_URI_GMAIL_NODEMAILER,
  REFRESH_TOKEN_GMAIL,
  MAIL_USER,
  MAIL_PASSWORD,
} = process.env;

const client = new OAuth2Client(
  ID_CLIENT_GMAIL_NODEMAILER,
  SECRET_GMAIL_NODEMAILER,
  REDIRECT_URI_GMAIL_NODEMAILER,
);

client.setCredentials({ refresh_token: REFRESH_TOKEN_GMAIL });

async function obtenerAccessToken() {
  const token = await client.getAccessToken();
  return token;
}

export async function createTransportNodeMailer() {
  const accessToken = await obtenerAccessToken();

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "santiagousca716@gmail.com",
      clientId: ID_CLIENT_GMAIL_NODEMAILER,
      clientSecret: SECRET_GMAIL_NODEMAILER,
      refreshToken: REFRESH_TOKEN_GMAIL,
      accessToken: accessToken as string,
    },
  });
}
