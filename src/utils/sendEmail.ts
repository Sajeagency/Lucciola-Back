import nodemailer, { Transporter } from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import { emailToSend } from "../types/email.types";

const {
  ID_CLIENT_GMAIL_NODEMAILER,
  SECRET_GMAIL_NODEMAILER,
  REDIRECT_URI_GMAIL_NODEMAILER,
  REFRESH_TOKEN_GMAIL,
} = process.env;

const oAuth2Client = new OAuth2Client(
  ID_CLIENT_GMAIL_NODEMAILER,
  SECRET_GMAIL_NODEMAILER,
  REDIRECT_URI_GMAIL_NODEMAILER
);
oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN_GMAIL,
});

export const sendEmail = async ({ to, subject, html }: emailToSend) => {
  const { token } = await oAuth2Client.getAccessToken();

  const transporter: Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "santiagousca716@gmail.com",
      clientId: ID_CLIENT_GMAIL_NODEMAILER,
      clientSecret: SECRET_GMAIL_NODEMAILER,
      refreshToken: REFRESH_TOKEN_GMAIL,
      accessToken: token as string, 
    },
  });

  const emailReset = {
    from: "santiagousca716@gmail.com",
    to,
    subject,
    html,
  };

  const result = await transporter.sendMail(emailReset);
  return result;
};
