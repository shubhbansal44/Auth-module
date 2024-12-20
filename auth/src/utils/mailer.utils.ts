import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

interface SendVerificationMailOptions {
  name: string;
  email: string;
  token: string;
}

export const sendVerificationEmail = async ({
  name,
  email,
  token,
}: SendVerificationMailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const filePath = path.join(process.cwd(), "public", "verifyEmail.html");

    let htmlTemplate = fs.readFileSync(filePath, "utf8");
    const verificationLink = `${process.env.DOMAIN}/auth/verify?token=${token}`;
    const supportLink = `${process.env.DOMAIN}/support`;

    htmlTemplate = htmlTemplate
      .replace("{{name}}", name)
      .replace("{{verificationLink}}", verificationLink)
      .replace("{{supportLink}}", supportLink);

    const mailOptions = {
      from: "no-reply@example.com",
      to: email,
      subject: "Verify your email",
      html: htmlTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error: any) {
    return null;
  }
};

interface SendResetPasswordMailOptions {
  name: string;
  email: string;
  token: string;
}

export const sendResetPasswordMail = async ({
  name,
  email,
  token,
}: SendResetPasswordMailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const filePath = path.join(process.cwd(), "public", "resetPassword.html");

    let htmlTemplate = fs.readFileSync(filePath, "utf8");
    const resetLink = `${process.env.DOMAIN}/auth/reset-password?token=${token}`;
    const supportLink = `${process.env.DOMAIN}/support`;


    htmlTemplate = htmlTemplate
      .replace("{{name}}", name)
      .replace("{{resetLink}}", resetLink)
      .replace("{{supportLink}}", supportLink);
      

    const mailOptions = {
      from: "no-reply@example.com",
      to: email,
      subject: "Reset your password",
      html: htmlTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error: any) {
    return null;
  }
};

interface SendTwoStepVerificationMailOptions {
  name: string;
  email: string;
  token: string;
}

export const sendTwoStepVerificationMail = async ({
  name,
  email,
  token,
}: SendTwoStepVerificationMailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const filePath = path.join(process.cwd(), "public", "twoStepVerification.html");

    let htmlTemplate = fs.readFileSync(filePath, "utf8");
    const verificationLink = `${process.env.DOMAIN}/auth/two-step-verification`;
    const supportLink = `${process.env.DOMAIN}/support`;

    htmlTemplate = htmlTemplate
      .replace("{{name}}", name)
      .replace("{{verificationLink}}", verificationLink)
      .replace("{{supportLink}}", supportLink)
      .replace("{{otp}}", token);

    const mailOptions = {
      from: "no-reply@example.com",
      to: email,
      subject: "Two-Step Verification",
      html: htmlTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error: any) {
    return null;
  }
};
