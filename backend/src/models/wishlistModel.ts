import mongoose, { model, Schema, Document } from "mongoose";

export interface IWishlist extends Document {
  userId: mongoose.Types.ObjectId;
  productIds: mongoose.Types.ObjectId[];
  updatedAt: Date;
}

const WishlistSchema = new Schema<IWishlist>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  productIds: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  updatedAt: { type: Date, default: Date.now },
});

// WishlistSchema.index({ userId: 1 })

const WishlistModel = model<IWishlist>("Wishlist", WishlistSchema);

export { WishlistModel };
