import dotenv from "dotenv";
import nodemailer from "nodemailer";


dotenv.config();

export const sendOtp = async(email,otp) => {
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

     const mailConfiguration = {
    from: process.env.NODE_MAIL_USER,
    to: email,
    subject: "Password Reset OTP",
    html: `<p> Your Otp is ${otp} </p>`,
  };

  await transporter.sendMail(mailConfiguration);
}
