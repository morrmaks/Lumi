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

  async sendOrderCreated(
    email: string,
    orderNumber: string,
    total: number,
    paymentUrl: string,
  ): Promise<void> {
    await this.transporter.sendMail({
      from: env.SMTP_USER,
      to: email,
      subject: `Новый заказ #${orderNumber}`,
      html: `
        <div>
          <h2>Ваш заказ #${orderNumber} успешно создан</h2>
          <p>Сумма: ${total} руб.</p>
          <p>Перейти к оплате: <a href="${paymentUrl}">Оплатить</a></p>
        </div>
      `,
    });
  }

  async sendOrderPaid(
    email: string,
    orderNumber: string,
    total: number,
  ): Promise<void> {
    await this.transporter.sendMail({
      from: env.SMTP_USER,
      to: email,
      subject: `Заказ #${orderNumber} оплачен`,
      html: `
        <div>
          <h2>Ваш заказ #${orderNumber} оплачен</h2>
          <p>Сумма: ${total} руб.</p>
          <p>Спасибо за доверие!</p>
        </div>
      `,
    });
  }
}

const mailService = new MailService();

export { mailService };
