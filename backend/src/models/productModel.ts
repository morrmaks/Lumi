import mongoose, { model, Schema, Document } from "mongoose";
import { ComponentType } from "@/types/product";

export interface IProduct extends Document {
  name: string;
  description: string;
  categoryId: mongoose.Types.ObjectId;
  price: number;
  discountPrice: number;
  rating: number;
  reviews: number;
  images: string[];
  quantity?: number;
  specs?: Record<string, string | number>;
  componentType?: ComponentType;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number, required: true },
  rating: { type: Number, required: true },
  reviews: { type: Number, required: true },
  images: [String],
  quantity: { type: Number },
  specs: { type: Schema.Types.Mixed },
  componentType: { type: String },
});

ProductSchema.index({ categoryId: 1 });

const ProductModel = model<IProduct>("Product", ProductSchema);

export { ProductModel };
