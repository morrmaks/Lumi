import mongoose, { model, Schema, Document } from "mongoose";

export interface IBasket extends Document {
  userId: mongoose.Types.ObjectId;
  items: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
  }[];
  updatedAt: Date;
}

const BasketSchema = new Schema<IBasket>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
  updatedAt: { type: Date, default: Date.now },
});

// BasketSchema.index({ userId: 1 })

const BasketModel = model<IBasket>("Basket", BasketSchema);

export { BasketModel };
