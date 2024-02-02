import nodemailer, { Transporter } from "nodemailer";
import { emailToSend } from "../types/email.types";

const transporter: Transporter = nodemailer.createTransport({
  service: "yahoo",

  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});
export const sendEmail = async ({ to, subject, html }: emailToSend) => {
  const emailReset = {
    from: "mad_civ@yahoo.com",
    to,
    subject,
    html,
  };
  await transporter.sendMail(emailReset);
};
