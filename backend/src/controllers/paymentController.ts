import { NextFunction, Request, Response } from "express";
import { bannerService } from "@/services/bannerService";
import { paymentService } from "@/services/paymentService";

class PaymentController {
  async createPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { amount, description, orderId } = req.body;

      const payment = await paymentService.createPayment(
        amount,
        description,
        orderId,
      );
      return res.json(payment);
    } catch (e) {
      next(e);
    }
  }

  async paymentWebhook(req: Request, res: Response, next: NextFunction) {
    try {
      await paymentService.handleWebhook(req.body);
      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }
}

const paymentController = new PaymentController();

export { paymentController };
