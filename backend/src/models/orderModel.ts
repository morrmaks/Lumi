import mongoose, { model, Schema, Document } from "mongoose";
import { OrderStatus, PaymentMethods } from "@/consts/order";

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  products: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
  }[];
  total: number;
  status: OrderStatus;
  date: Date;
  trackNumber: string;
  address: string;
  paymentMethod: PaymentMethods;
}

const OrderSchema = new Schema<IOrder>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.PENDING,
    required: true,
  },
  date: { type: Date, default: Date.now, required: true },
  trackNumber: { type: String, required: true },
  address: { type: String, required: true },
  paymentMethod: {
    type: String,
    enum: Object.values(PaymentMethods),
    required: true,
  },
});

const OrderModel = model<IOrder>("Order", OrderSchema);

export { OrderModel };
