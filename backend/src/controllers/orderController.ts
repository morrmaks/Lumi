import { NextFunction, Request, Response } from "express";
import { orderService } from "@/services/orderService";

class OrderController {
  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await orderService.getAll();
      return res.json(orders);
    } catch (e) {
      next(e);
    }
  }

  async getOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;
      const order = await orderService.getById(orderId);
      return res.json(order);
    } catch (e) {
      next(e);
    }
  }

  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { data } = req.body;
      const orders = await orderService.create(data);
      return res.json(orders);
    } catch (e) {
      next(e);
    }
  }
}

const orderController = new OrderController();

export { orderController };
