import { NextFunction, Request, Response } from "express";
import { orderService } from "@/services/orderService";
import { ApiError } from "@/exeptions/apiError";
import { PaymentMethods } from "@/consts/order";

class OrderController {
  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = (req as any).user;
      const orders = await orderService.getOrders(userId);
      return res.json(orders);
    } catch (e) {
      next(e);
    }
  }

  async getOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;
      const order = await orderService.getOrder(orderId);
      return res.json(order);
    } catch (e) {
      next(e);
    }
  }

  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = (req as any).user;
      const { products, address, paymentMethod } = req.body;

      if (!products || products.length === 0)
        throw ApiError.BadRequest("Нет продуктов для заказа");
      if (!address) throw ApiError.BadRequest("Нет адреса");
      if (!Object.values(PaymentMethods).includes(paymentMethod))
        throw ApiError.BadRequest("Неверный способ оплаты");

      const confirmationUrl = await orderService.createOrder(
        userId,
        products,
        address,
        paymentMethod,
      );
      return res.json(confirmationUrl);
    } catch (e) {
      next(e);
    }
  }

  async getOrderProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;
      const products = await orderService.getOrderProducts(orderId);
      return res.json(products);
    } catch (e) {
      next(e);
    }
  }

  async payOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;
      const payment = await orderService.payOrder(orderId);
      return res.json(payment);
    } catch (e) {
      next(e);
    }
  }

  async paymentValidate(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("запрос1", req.params);
      console.log("запрос1", req.query);
      const { orderId } = req.params;
      const query = req.query;
      const response = await orderService.paymentValidate(orderId);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }
}

const orderController = new OrderController();

export { orderController };
