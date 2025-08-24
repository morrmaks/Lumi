import { OrderModel, IOrder } from "@/models/orderModel";
import mongoose from "mongoose";
import { IProduct, ProductModel } from "@/models/productModel";
import { OrderStatus, PaymentMethods, PaymentStatus } from "@/consts/order";
import { ApiError } from "@/exeptions/apiError";
import { paymentService } from "@/services/paymentService";
import { OrderProductDto } from "@/dtos/orderProductDto";
import { CategoryModel, ICategory } from "@/models/categoryModel";
import { IOrderDto, IOrderProductDto } from "@/types/order";
import { OrderDto } from "@/dtos/orderDto";
import { log } from "winston";
import { IUser, UserModel } from "@/models/userModel";
import { mailService } from "@/services/mailService";
import { Payment } from "@a2seven/yoo-checkout";

class OrderService {
  async getOrders(userId: string): Promise<IOrderDto[]> {
    const orders = await OrderModel.find<IOrder>({ userId }).sort({
      createdAt: -1,
    });
    return orders.map((order) => new OrderDto(order));
  }

  async getOrder(orderId: string): Promise<IOrderDto> {
    const order = await this._findOrderById(orderId);
    return new OrderDto(order);
  }

  async getOrderProducts(orderId: string): Promise<IOrderProductDto[]> {
    const order = await this._findOrderById(orderId);
    return await this._mapOrderProducts(order);
  }

  async createOrder(
    userId: string,
    products: { productId: string; quantity: number }[],
    address: string,
    paymentMethod: PaymentMethods,
  ): Promise<{ orderId: string; paymentUrl: string }> {
    const total = await this._calculateTotal(products);

    const order = new OrderModel({
      userId,
      products,
      total,
      status: OrderStatus.PENDING,
      address,
      paymentMethod,
    });

    const payment = await this._createPaymentForOrder(order);
    if (!payment.confirmation.confirmation_url)
      throw ApiError.BadRequest("Ссылка на оплату не найдена");

    order.payment = {
      paymentId: payment.id,
      confirmationUrl: payment.confirmation.confirmation_url,
      status: payment.status as PaymentStatus,
    };
    await order.save();

    await this._sendOrderCreatedEmail(
      userId,
      order,
      total,
      payment.confirmation.confirmation_url,
    );

    return {
      orderId: order._id.toString(),
      paymentUrl: payment.confirmation.confirmation_url,
    };
  }

  async payOrder(orderId: string): Promise<string> {
    const order = await this._findOrderById(orderId);

    if (order.payment?.paymentId) {
      const currentPayment = await paymentService.getPayment(
        order.payment.paymentId,
      );

      if (currentPayment.status === PaymentStatus.SUCCEEDED)
        ApiError.BadRequest("Заказ уже оплачен");

      if (
        currentPayment.status === PaymentStatus.PENDING &&
        order.payment.confirmationUrl
      ) {
        return order.payment.confirmationUrl;
      }
    }

    const payment = await this._createPaymentForOrder(order);
    if (!payment.confirmation.confirmation_url)
      throw ApiError.BadRequest("Ссылка на оплату не найдена");

    order.payment = {
      paymentId: payment.id,
      confirmationUrl: payment.confirmation.confirmation_url,
      status: payment.status as PaymentStatus,
    };
    await order.save();
    return payment.confirmation.confirmation_url;
  }

  async paymentValidate(orderId: string): Promise<{ success: boolean }> {
    const order = await this._findOrderById(orderId);

    if (!order.payment || !order.payment?.paymentId)
      throw ApiError.Forbidden("Оплата еще не создана");

    return { success: true };
  }

  private async _findOrderById(orderId: string): Promise<IOrder> {
    const order = await OrderModel.findById<IOrder>(orderId);
    if (!order) throw ApiError.NotFound(`Заказ ${orderId} не найден`);
    return order;
  }

  private async _calculateTotal(
    products: { productId: string; quantity: number }[],
  ): Promise<number> {
    const validProducts = products.filter((p) =>
      mongoose.Types.ObjectId.isValid(p.productId),
    );
    if (validProducts.length !== products.length)
      throw ApiError.BadRequest("Некоторые id товаров невалидны");

    const productIds = validProducts.map(
      (p) => new mongoose.Types.ObjectId(p.productId),
    );
    const productsFromDb = await ProductModel.find<IProduct>({
      _id: { $in: productIds },
    });
    if (productIds.length !== productsFromDb.length)
      throw ApiError.NotFound("Некоторые товары не найдены");

    return productsFromDb.reduce((sum, product) => {
      const quantity =
        products.find((p) => p.productId === product._id.toString())
          ?.quantity || 1;
      return sum + product.price * quantity;
    }, 0);
  }

  private async _createPaymentForOrder(order: IOrder): Promise<Payment> {
    const payment = await paymentService.createPayment(
      order.total,
      `Оплата заказа #${order._id}`,
      order._id.toString(),
    );

    return payment;
  }

  private async _sendOrderCreatedEmail(
    userId: string,
    order: IOrder,
    total: number,
    paymentUrl: string,
  ) {
    const user = await UserModel.findById<IUser>(userId);
    if (user?.email) {
      await mailService.sendOrderCreated(
        user.email,
        order._id.toString(),
        total,
        paymentUrl,
      );
    }
  }

  private async _mapOrderProducts(order: IOrder): Promise<IOrderProductDto[]> {
    const productIdsArray = order.products.map((p) => p.productId);
    if (!productIdsArray.length) throw ApiError.NotFound("Товары не найдены");

    const fullProducts = await ProductModel.find<IProduct>({
      _id: { $in: productIdsArray },
    });
    if (fullProducts.length !== productIdsArray.length)
      throw ApiError.NotFound("Некоторые товары не найдены");

    const quantityProductMap = Object.fromEntries(
      order.products.map((p) => [p.productId, p.quantity]),
    );

    const categoryIds = [
      ...new Set(fullProducts.map((product) => product.categoryId)),
    ];
    const categories = await CategoryModel.find<ICategory>({
      _id: { $in: categoryIds },
    }).exec();
    const categoryMap = Object.fromEntries(
      categories.map((category) => [category._id, category.slug]),
    );

    return fullProducts.map(
      (product) =>
        new OrderProductDto(
          product,
          quantityProductMap[product._id.toString()],
          categoryMap[product.categoryId.toString()],
        ),
    );
  }
}

const orderService = new OrderService();

export { orderService };
