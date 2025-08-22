import { OrderModel, IOrder } from "@/models/orderModel";
import mongoose from "mongoose";
import { IProduct } from "@/models/productModel";

class OrderService {
  async getAll(): Promise<IOrder[]> {
    return OrderModel.find();
  }

  async getById(orderId: string): Promise<IOrder | null> {
    const order = OrderModel.findById(orderId);
    if (!order) {
      throw new Error("Заказ не найден");
    }
    return order;
  }

  async create(data: Partial<IOrder>): Promise<IOrder> {
    const order = new OrderModel(data);
    return order.save();
  }
}

const orderService = new OrderService();

export { orderService };
