import mongoose, { model, Schema, Document } from "mongoose";
import { OrderStatus, PaymentMethods, PaymentStatus } from "@/consts/order";

export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  products: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
  }[];
  total: number;
  status: OrderStatus;
  trackNumber: string;
  address: string;
  paymentMethod: PaymentMethods;
  payment?: {
    paymentId?: string;
    confirmationUrl?: string;
    status?: PaymentStatus;
  };
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
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
        quantity: { type: Number, default: 1, min: 1 },
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
      required: true,
    },
    trackNumber: { type: String, required: true },
    address: { type: String, required: true },
    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethods),
      required: true,
    },
    payment: {
      paymentId: { type: String },
      confirmationUrl: { type: String },
      status: {
        type: String,
        enum: Object.values(PaymentStatus),
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret.id = ret._id;
        Reflect.deleteProperty(ret, "_id");
        Reflect.deleteProperty(ret, "__v");
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
  },
);

OrderSchema.index({ userId: 1, createdAt: -1 });

OrderSchema.pre("validate", function (next) {
  if (!this.trackNumber) {
    const ts = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
    this.trackNumber = `TRK-${ts}-${rand}`;
  }
  next();
});

const OrderModel = model<IOrder>("Order", OrderSchema);

export { OrderModel };
