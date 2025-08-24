import { WishlistModel, IWishlist } from "@/models/wishlistModel";
import { IProduct, ProductModel } from "@/models/productModel";
import mongoose, { Types } from "mongoose";
import { WishlistDto } from "@/dtos/wishlistDto";
import { IWishlistDto } from "@/types/wishlist";
import { CategoryModel } from "@/models/categoryModel";
import { ApiError } from "@/exeptions/apiError";

class WishlistService {
  async getWishlist(userId: string): Promise<string[]> {
    const wishlist = await WishlistModel.findOne({ userId })
      .select("productIds")
      .exec();

    if (!wishlist) return [];
    return wishlist.productIds.map((productId) => productId.toString());
  }

  async getWishlistProducts(productIds: string[]): Promise<IWishlistDto[]> {
    if (!productIds.length)
      throw ApiError.BadRequest("Товары не были переданы");

    const products = await ProductModel.find<IProduct>({
      _id: { $in: productIds },
    });
    if (!products.length) throw ApiError.NotFound("Товары не найдены");

    const categoryMap = await this._getCategoryMapProducts(products);

    return products.map(
      (product) =>
        new WishlistDto(product, categoryMap[product.categoryId.toString()]),
    );
  }

  async addProduct(userId: string, productId: string): Promise<string> {
    await this._getProductOrThrow(productId);

    let wishlist = await WishlistModel.findOne({ userId });
    if (!wishlist) {
      wishlist = await WishlistModel.create({
        userId,
        productIds: [new mongoose.Types.ObjectId(productId)],
      });
    } else if (!wishlist.productIds.some((id) => id.toString() === productId)) {
      wishlist.productIds.push(new mongoose.Types.ObjectId(productId));
    }
    await this._saveWishlist(wishlist);

    return productId;
  }

  async addProducts(userId: string, productIds: string[]): Promise<string[]> {
    const products = await ProductModel.find({ _id: { $in: productIds } });
    if (!products) throw ApiError.NotFound("Товар не найден");

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

    await this._saveWishlist(wishlist);
    return productIds;
  }

  async deleteProduct(userId: string, productId: string): Promise<string> {
    let wishlist = await this._getWishlistOrThrow(userId);

    wishlist.productIds = wishlist.productIds.filter(
      (id) => id.toString() !== productId,
    );

    await this._saveWishlist(wishlist);
    return productId;
  }

  async deleteProducts(
    userId: string,
    productIds: string[],
  ): Promise<string[]> {
    let wishlist = await this._getWishlistOrThrow(userId);

    wishlist.productIds = wishlist.productIds.filter(
      (id) => !productIds.includes(id.toString()),
    );

    await this._saveWishlist(wishlist);
    return productIds;
  }

  async clearWishlist(userId: string): Promise<Array<string>> {
    let wishlist = await this._getWishlistOrThrow(userId);
    wishlist.productIds = [];
    await this._saveWishlist(wishlist);
    return [];
  }

  private async _getProductOrThrow(productId: string): Promise<IProduct> {
    const product = await ProductModel.findById(productId);
    if (!product) throw ApiError.NotFound("Товар не найден");
    return product;
  }

  private async _getWishlistOrThrow(userId: string): Promise<IWishlist> {
    let wishlist = await WishlistModel.findOne({ userId });
    if (!wishlist) throw ApiError.NotFound("Избранное не найдено");
    return wishlist;
  }

  private async _saveWishlist(wishlist: IWishlist) {
    wishlist.updatedAt = new Date();
    await wishlist.save();
  }

  private async _getCategoryMapProducts(
    products: IProduct[],
  ): Promise<Record<string, string>> {
    const categoryIds = [
      ...new Set(products.map((product) => product.categoryId)),
    ];
    const categories = await CategoryModel.find({
      _id: { $in: categoryIds },
    }).exec();
    return Object.fromEntries(
      categories.map((category) => [category._id, category.slug]),
    );
  }
}

const wishlistService = new WishlistService();

export { wishlistService };
