import nodemailer from "nodemailer";
import { env } from "@/config/env";
import { IUser, UserModel } from "@/models/userModel";

class MailService {
  transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT),
      secure: false,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASSWORD,
      },
    });
  }

  async generateUniqueCode(length: number = 6): Promise<string> {
    return Math.floor(Math.random() * Math.pow(10, length))
      .toString()
      .padStart(length, "0");
  }

  async sendVerificationCode(email: string, code: string): Promise<void> {
    await this.transporter.sendMail({
      from: env.SMTP_USER,
      to: email,
      subject: "Верификация аккаунта",
      text: `Ваш код подтверждения: ${code}`,
      html: `
        <div>
          <h1>Ваш код подтверждения:</h1>
          <p style='font-size: 24px; font-weight: bold'>${code}</p>
        </div>
      `,
    });
  }
}

const mailService = new MailService();

export { mailService };
