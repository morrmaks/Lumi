import { IOrderDto, IOrderProduct } from "@/types/order";
import { IOrder } from "@/models/orderModel";
import { PaymentStatus } from "@/consts/order";

class OrderDto implements IOrderDto {
  id: string;
  total: number;
  status: string;
  date: string;
  products: IOrderProduct[];
  trackNumber: string;
  address: string;
  paymentMethod: string;
  paymentStatus: PaymentStatus;

  constructor(model: IOrder) {
    this.id = String(model._id);
    this.total = model.total;
    this.status = model.status;
    this.products = model.products.map((p) => ({
      productId: String(p.productId),
      quantity: p.quantity,
    }));
    this.trackNumber = model.trackNumber;
    this.date = String(model.createdAt);
    this.address = model.address;
    this.paymentMethod = model.paymentMethod;
    this.paymentStatus = model.payment?.status || PaymentStatus.PENDING;
  }
}

export { OrderDto };
