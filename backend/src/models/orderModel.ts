import mongoose, { model, Schema, Document } from "mongoose";

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  products: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
  }[];
  total: number;
  status: string;
  date: string;
  trackNumber: string;
  address: string;
  paymentMethod: string;
}

const OrderSchema = new Schema<IOrder>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
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
  total: { type: Number, Required: true },
  status: { type: String, Required: true },
  date: { type: String, Required: true },
  trackNumber: { type: String, Required: true },
  address: { type: String, Required: true },
  paymentMethod: { type: String, Required: true },
});

// OrderSchema.index({ userId: 1 })

const OrderModel = model<IOrder>("Order", OrderSchema);

export { OrderModel };
