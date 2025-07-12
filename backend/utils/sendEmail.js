import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendBookingEmail = async (to, subject, text) => {
  await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to,
    subject,
    text,
  });
};
