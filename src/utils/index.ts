import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { BadRequestException } from "exceptions/bad-request";

interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  maxAge: number;
}

interface TokenResponse {
  token: string;
  options: CookieOptions;
}

interface SendEmailInterface {
  emailTo: string;
  subject: string;
  html: string;
}

interface SendVerificationEmailInterface {
  name: string;
  emailTo: string;
  verificationToken: string;
  origin: string;
  type: "verification" | "resetPassword";
}

const nodemailerConfig = {
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "mandreicosmin1990@gmail.com",
    pass: "swmfzoebthxaprap",
  },
};

export const createHash = (string: string) =>
  crypto.createHash("md5").update(string).digest("hex");

const sendEmail = async ({ emailTo, subject, html }: SendEmailInterface) => {
  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: '"Andreww 👻" <mandreicosmin1990@gmail.com>', // sender address || ADMIN's EMAIL
    to: emailTo,
    subject,
    html,
  });
};

export const sendEmailNotification = async ({
  name,
  emailTo,
  verificationToken,
  origin,
  type,
}: SendVerificationEmailInterface): Promise<any> => {
  const subjects = {
    verification: "Email Confirmation",
    resetPassword: "Reset Password",
  };

  const actionURLs = {
    verification: `${origin}/user/verify-email?token=${verificationToken}&email=${emailTo}`,
    resetPassword: `${origin}/user/reset-password?token=${verificationToken}&email=${emailTo}`,
  };

  const messages = {
    verification: `<p>Please confirm your email by clicking on the following link: 
        <a href="${actionURLs.verification}">Verify Email</a></p>`,
    resetPassword: `<p>Please reset your password by clicking on the following link: 
        <a href="${actionURLs.resetPassword}">Reset Password</a></p>`,
  };

  if (!subjects[type] || !messages[type]) {
    throw new BadRequestException("Invalid email type", 400, null);
  }

  return sendEmail({
    emailTo,
    subject: subjects[type],
    html: `<h4>Hello, ${name}</h4>${messages[type]}`,
  });
};

export const generateToken = (userId: number): TokenResponse => {
  const token = jwt.sign({ userId }, JWT_SECRET);

  const options: CookieOptions = {
    httpOnly: true, // Prevent client-side access to the cookie
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    // maxAge: 1 * 60 * 1000, // 1 minute
  };

  return { token, options };
};
