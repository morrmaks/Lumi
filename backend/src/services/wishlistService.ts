import { WishlistModel, IWishlist } from "@/models/wishlistModel";
import { IProduct, ProductModel } from "@/models/productModel";
import mongoose, { MergeType, Document } from "mongoose";

class WishlistService {
  async getWishlist(
    userId: string,
  ): Promise<Document<
    unknown,
    {},
    MergeType<IWishlist, { productIds: IProduct[] }>
  > | null> {
    const wishlist = await WishlistModel.findOne({ userId })
      .populate<{ productIds: IProduct[] }>("productIds")
      .exec();
    return wishlist;
  }

  async addProduct(
    userId: string,
    productId: string,
  ): Promise<MergeType<IWishlist, { productIds: IProduct[] }>> {
    let wishlist = await WishlistModel.findOne({ userId });
    if (!wishlist) {
      wishlist = await WishlistModel.create({
        userId,
        productIds: [new mongoose.Types.ObjectId(productId)],
      });
    } else if (!wishlist.productIds.some((id) => id.toString() === productId)) {
      wishlist.productIds.push(new mongoose.Types.ObjectId(productId));
      wishlist.updatedAt = new Date();
      await wishlist.save();
    }

    return wishlist.populate<{ productIds: IProduct[] }>("productIds");
  }

  async addProducts(
    userId: string,
    productIds: string[],
  ): Promise<MergeType<IWishlist, { productIds: IProduct[] }>> {
    let wishlist = await WishlistModel.findOne({ userId });
    if (!wishlist) {
      wishlist = new WishlistModel({
        userId,
        productIds: productIds.map(
          (productId) => new mongoose.Types.ObjectId(productId),
        ),
      });
    } else {
      for (const productId of productIds) {
        if (!wishlist.productIds.some((id) => id.toString() === productId)) {
          wishlist.productIds.push(new mongoose.Types.ObjectId(productId));
        }
      }
      wishlist.updatedAt = new Date();
      await wishlist.save();
    }

    return wishlist.populate<{ productIds: IProduct[] }>("productIds");
  }

  async deleteProduct(
    userId: string,
    productId: string,
  ): Promise<MergeType<IWishlist, { productIds: IProduct[] }>> {
    let wishlist = await WishlistModel.findOne({ userId });
    if (!wishlist) throw new Error("Избранное не найдено");

    wishlist.productIds.filter((id) => id.toString() !== productId);

    wishlist.updatedAt = new Date();
    await wishlist.save();

    return wishlist.populate<{ productIds: IProduct[] }>("productIds");
  }

  async deleteProducts(
    userId: string,
    productIds: string[],
  ): Promise<MergeType<IWishlist, { productIds: IProduct[] }>> {
    let wishlist = await WishlistModel.findOne({ userId });
    if (!wishlist) throw new Error("Избранное не найдено");

    wishlist.productIds.filter((id) => !productIds.includes(id.toString()));

    wishlist.updatedAt = new Date();
    await wishlist.save();

    return wishlist.populate<{ productIds: IProduct[] }>("productIds");
  }

  async clearWishlist(
    userId: string,
  ): Promise<MergeType<IWishlist, { productIds: IProduct[] }>> {
    let wishlist = await WishlistModel.findOne({ userId });
    if (!wishlist) throw new Error("Избранное не найдено");

    wishlist.productIds = [];

    wishlist.updatedAt = new Date();
    await wishlist.save();

    return wishlist.populate<{ productIds: IProduct[] }>("productIds");
  }
}

const wishlistService = new WishlistService();

export { wishlistService };
