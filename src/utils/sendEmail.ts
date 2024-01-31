import nodemailer, { Transporter, SendMailOptions } from "nodemailer";
import { emailReset } from "../types/email.types";

const transporter: Transporter = nodemailer.createTransport({
  service: "yahoo",

  auth: {
    user: "process.env.MAIL_USER",
    pass: "process.env.MAIL_PASSWORD",
  },
});
export const sendEmail = async ({ to, subject, html }: emailReset) => {
  const emailReset = {
    from: "mad_civ@yahoo.com",
    to,
    subject,
    html,
  };
  await transporter.sendMail(emailReset);
};
