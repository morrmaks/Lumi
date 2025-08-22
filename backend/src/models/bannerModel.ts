import mongoose, { model, Schema, Document } from "mongoose";

export interface IBanner extends Document {
  title: string;
  description: string;
  image: string;
  route: string;
}

const BannerSchema = new Schema<IBanner>({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: true },
  route: { type: String, required: true },
});

const BannerModel = model<IBanner>("Banner", BannerSchema);

export { BannerModel };
