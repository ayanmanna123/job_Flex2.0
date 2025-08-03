import nodemailer from "nodemailer";
import dotenv from "dotenv";
const sendEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // or another SMTP provider
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: subject,
    text: text,
  });
};

export default sendEmail;
