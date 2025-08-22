import { NextFunction, Request, Response } from "express";
import { bannerService } from "@/services/bannerService";

class PaymentController {
  async createPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { amount, description, orderId } = req.body;

      const banners = await bannerService.getAll();
      return res.json(banners);
    } catch (e) {
      next(e);
    }
  }

  async getPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const banners = await bannerService.getAll();
      return res.json(banners);
    } catch (e) {
      next(e);
    }
  }
}

const paymentController = new PaymentController();

export { paymentController };
