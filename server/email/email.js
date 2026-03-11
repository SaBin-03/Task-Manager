import dotenv from "dotenv";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import handlebars from "handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

export const verifyEmail = async (token, email) => {
  const emailTemplateSource = fs.readFileSync(
    path.join(__dirname, "template.hbs"),
    "utf-8",
  );

  const template = handlebars.compile(emailTemplateSource);
  const htmlToSend = template({ token: encodeURIComponent(token) });

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Not localhost!
    port: 465,
    secure: true,
    service: "email",
    auth: {
      user: process.env.NODE_MAIL_USER,
      pass: process.env.NODE_MAIL_PASS,
    },
  });



  const emailConfiguration = {
    from: process.env.NODE_MAIL_USER,
    to: email,
    subject: "Email Verification",
    html: htmlToSend,
  };
  transporter.sendMail(emailConfiguration, (err, info) => {
    if (err) {
      console.log(err);
    }
  });
};
