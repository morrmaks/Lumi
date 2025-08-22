import { ICreatePayment, YooCheckout } from "@a2seven/yoo-checkout";
import { env } from "@/config/env";

const YooKassa = new YooCheckout({
  shopId: env.YOO_SHOP_ID,
  secretKey: env.YOO_SECRET_KEY,
});

class PaymentService {
  async createPayment(amount: number, description: string, orderId: string) {
    const createPayment: ICreatePayment = {
      amount: {
        value: amount.toFixed(2),
        currency: "RUB",
      },
      capture: true,
      confirmation: {
        type: "redirect",
        return_url: `${env.API_URL}/payment/success`,
      },
      description,
      metadata: {
        orderId,
      },
    };

    const payment = await YooKassa.createPayment(createPayment);
    return payment;
  }

  async getPayment(paymentId: string) {
    return await YooKassa.getPayment(paymentId);
  }
}

const paymentService = new PaymentService();

export { paymentService };
