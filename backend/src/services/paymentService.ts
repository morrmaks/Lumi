import { ICreatePayment, YooCheckout } from "@a2seven/yoo-checkout";
import { env } from "@/config/env";
import { v4 as uuidv4 } from "uuid";
import { ApiError } from "@/exeptions/apiError";
import { IOrder, OrderModel } from "@/models/orderModel";
import { OrderStatus, PaymentStatus } from "@/consts/order";
import { IUser, UserModel } from "@/models/userModel";
import { mailService } from "@/services/mailService";

const YooKassa = new YooCheckout({
  shopId: env.YOO_SHOP_ID,
  secretKey: env.YOO_SECRET_KEY,
});

class PaymentService {
  async createPayment(amount: number, description: string, orderId: string) {
    const idempotencyKey = uuidv4();

    const createPayment = this._buildPaymentData(amount, description, orderId);
    return await YooKassa.createPayment(createPayment, idempotencyKey);
  }

  async handleWebhook(event: any) {
    if (!event || !event.event || !event.object)
      throw ApiError.BadRequest("Неверный объект вебхука");

    if (event.event === "payment.succeeded") {
      const orderId = event.object.metadata.orderId;
      if (!orderId) throw ApiError.BadRequest("orderId не найден в metadata");

      const order = await this._getOrderOrThrow(orderId);
      order.status = OrderStatus.PAID;
      order.payment = order.payment || {};
      order.payment.status = PaymentStatus.SUCCEEDED;
      order.payment.confirmationUrl = undefined;

      await order.save();

      const userEmail = await this._getUserEmailOrThrow(
        order.userId.toString(),
      );
      await mailService.sendOrderPaid(
        userEmail,
        order.orderNumber,
        order.total,
      );
    }
  }

  async getPayment(paymentId: string) {
    return await YooKassa.getPayment(paymentId);
  }

  private async _getOrderOrThrow(orderId: string) {
    const order = await OrderModel.findById<IOrder>(orderId);
    if (!order) throw ApiError.BadRequest(`Заказ ${orderId} не найден`);
    return order;
  }

  private async _getUserEmailOrThrow(userId: string) {
    const user = await UserModel.findById<IUser>(userId);
    if (!user?.email)
      throw ApiError.BadRequest(
        `Пользователь ${userId} не найден или email отсутствует`,
      );
    return user.email;
  }

  private _buildPaymentData(
    amount: number,
    description: string,
    orderId: string,
  ): ICreatePayment {
    return {
      amount: {
        value: amount.toFixed(2),
        currency: "RUB",
      },
      capture: true,
      confirmation: {
        type: "redirect",
        return_url: `https://greatly-gainful-rockhopper.cloudpub.ru/payment-success?orderId=${orderId}`,
        // return_url: `${env.CLIENT_PROD_URL}/payment/success`,
      },
      description,
      metadata: { orderId },
    };
  }
}

const paymentService = new PaymentService();

export { paymentService };
