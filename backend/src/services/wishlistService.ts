import { WishlistModel, IWishlist } from "@/models/wishlistModel";
import { IProduct, ProductModel } from "@/models/productModel";
import mongoose, { MergeType, Document } from "mongoose";
import { WishlistDto } from "@/dtos/wishlistDto";
import { IWishlistDto } from "@/types/wishlist";
import { CategoryModel } from "@/models/categoryModel";

class WishlistService {
  async getWishlist(userId: string): Promise<string[]> {
    const wishlist = await WishlistModel.findOne({ userId })
      .select("productIds")
      .exec();

    if (!wishlist) return [];

    return wishlist.productIds.map((productId) => productId.toString());
  }

  async getWishlistProducts(productIds: string[]): Promise<IWishlistDto[]> {
    if (!productIds.length) throw new Error("Товары не были переданы");

    const products = await ProductModel.find({ _id: { $in: productIds } });

    const categoryIds = [
      ...new Set(products.map((product) => product.categoryId)),
    ];
    const categories = await CategoryModel.find({
      _id: { $in: categoryIds },
    }).exec();
    const categoryMap = Object.fromEntries(
      categories.map((category) => [category._id, category.slug]),
    );

    return products.map(
      (product) =>
        new WishlistDto(product, categoryMap[product.categoryId.toString()]),
    );
  }

  async addProduct(userId: string, productId: string): Promise<string> {
    const product = await ProductModel.findById(productId);
    if (!product) throw new Error("Товар не найден");

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

    return productId;
  }

  async addProducts(userId: string, productIds: string[]): Promise<string[]> {
    const products = await ProductModel.find({ _id: { $in: productIds } });
    if (!products) throw new Error("Товар не найден");

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
    }

    wishlist.updatedAt = new Date();
    await wishlist.save();
    return productIds;
  }

  async deleteProduct(userId: string, productId: string): Promise<string> {
    let wishlist = await WishlistModel.findOne({ userId });
    if (!wishlist) throw new Error("Избранное не найдено");

    wishlist.productIds = wishlist.productIds.filter(
      (id) => id.toString() !== productId,
    );

    wishlist.updatedAt = new Date();
    await wishlist.save();

    return productId;
  }

  async deleteProducts(
    userId: string,
    productIds: string[],
  ): Promise<string[]> {
    let wishlist = await WishlistModel.findOne({ userId });
    if (!wishlist) throw new Error("Избранное не найдено");

    wishlist.productIds = wishlist.productIds.filter(
      (id) => !productIds.includes(id.toString()),
    );

    wishlist.updatedAt = new Date();
    await wishlist.save();

    return productIds;
  }

  async clearWishlist(userId: string): Promise<Array<string>> {
    let wishlist = await WishlistModel.findOne({ userId });
    if (!wishlist) throw new Error("Избранное не найдено");

    wishlist.productIds = [];

    wishlist.updatedAt = new Date();
    await wishlist.save();

    return [];
  }
}

const wishlistService = new WishlistService();

export { wishlistService };
