import { BasketModel, IBasket } from "@/models/basketModel";
import mongoose from "mongoose";
import { IProduct, ProductModel } from "@/models/productModel";
import { IBasketDto } from "@/types/basket";
import { CategoryModel, ICategory } from "@/models/categoryModel";
import { WishlistDto } from "@/dtos/wishlistDto";
import { BasketDto } from "@/dtos/basketDto";
import { WishlistModel } from "@/models/wishlistModel";
import { ApiError } from "@/exeptions/apiError";

class BasketService {
  async getBasket(userId: string): Promise<IBasket["items"]> {
    const basket = await BasketModel.findOne({ userId }).select("items").exec();

    if (!basket) return [];

    return basket.items;
  }

  async getBasketProducts(productIds: string[]): Promise<IBasketDto[]> {
    if (!productIds.length)
      throw ApiError.BadRequest("Товары не были переданы");

    const products = await ProductModel.find<IProduct>({
      _id: { $in: productIds },
    });
    if (!products.length) throw ApiError.NotFound("Товары не найдены");

    const categoryIds = [
      ...new Set(products.map((product) => product.categoryId)),
    ];
    const categories = await CategoryModel.find<ICategory>({
      _id: { $in: categoryIds },
    }).exec();
    const categoryMap = Object.fromEntries(
      categories.map((category) => [category._id, category.slug]),
    );

    return products.map(
      (product) =>
        new BasketDto(product, categoryMap[product.categoryId.toString()]),
    );
  }

  async addProduct(userId: string, productId: string): Promise<string> {
    const product = await ProductModel.findById(productId);
    if (!product) throw ApiError.NotFound("Товар не найден");
    let basket = await BasketModel.findOne<IBasket>({ userId });

    if (!basket) {
      basket = new BasketModel({
        userId,
        items: [
          {
            productId: new mongoose.Types.ObjectId(productId),
            quantity: 1,
          },
        ],
      });
    } else {
      const item = basket.items.find(
        (item) => item.productId.toString() === productId,
      );
      if (item) {
        item.quantity++;
      } else {
        basket.items.push({
          productId: new mongoose.Types.ObjectId(productId),
          quantity: 1,
        });
      }
    }

    basket.updatedAt = new Date();
    await basket.save();
    return productId;
  }

  async addProducts(
    userId: string,
    productItems: IBasket["items"],
  ): Promise<IBasket["items"]> {
    if (!productItems.length)
      throw ApiError.BadRequest("Список переданных товаров пуст");

    const productIds = productItems.map((item) => item.productId.toString());
    const products = await ProductModel.find({ _id: { $in: productIds } });
    if (products.length !== productIds.length)
      throw ApiError.NotFound("Некоторые товары не найдены");

    let basket = await BasketModel.findOne<IBasket>({ userId });

    const changedItems: IBasket["items"] = [];

    if (!basket) {
      basket = new BasketModel({
        userId,
        items: productItems,
      });
    } else {
      for (const productItem of productItems) {
        const item = basket.items.find(
          (item) =>
            item.productId.toString() === productItem.productId.toString(),
        );
        if (item) {
          item.quantity += productItem.quantity;
        } else {
          const newItem = {
            productId: new mongoose.Types.ObjectId(productItem.productId),
            quantity: productItem.quantity,
          };
          basket.items.push(newItem);
          changedItems.push(newItem);
        }
      }
    }

    basket.updatedAt = new Date();
    await basket.save();

    return changedItems;
  }

  async deleteProduct(userId: string, productId: string): Promise<string> {
    let basket = await BasketModel.findOne<IBasket>({ userId });
    if (!basket) throw ApiError.NotFound("Корзина не найдена");

    const before = basket.items.length;
    basket.items = basket.items.filter(
      (item) => item.productId.toString() !== productId,
    );
    if (before === basket.items.length)
      throw ApiError.NotFound("Товар не найден в корзине");

    basket.updatedAt = new Date();
    await basket.save();
    return productId;
  }

  async increaseQuantity(userId: string, productId: string): Promise<string> {
    let basket = await BasketModel.findOne<IBasket>({ userId });
    if (!basket) throw ApiError.NotFound("Корзина не найдена");

    const item = basket.items.find(
      (item) => item.productId.toString() === productId,
    );
    if (!item) throw ApiError.NotFound("Товар не найден в корзине");

    if (item) {
      item.quantity++;
    }

    basket.updatedAt = new Date();
    await basket.save();
    return productId;
  }

  async decreaseQuantity(userId: string, productId: string): Promise<string> {
    let basket = await BasketModel.findOne<IBasket>({ userId });
    if (!basket) throw ApiError.NotFound("Корзина не найдена");

    const item = basket.items.find(
      (item) => item.productId.toString() === productId,
    );
    if (!item) throw ApiError.NotFound("Товар не найден в корзине");

    if (item) {
      item.quantity--;
    }

    basket.updatedAt = new Date();
    await basket.save();
    return productId;
  }

  async clearBasket(userId: string): Promise<IBasket> {
    let basket = await BasketModel.findOne<IBasket>({ userId });
    if (!basket) throw ApiError.NotFound("Корзина не найдена");

    basket.items = [];
    basket.updatedAt = new Date();
    return await basket.save();
  }
}

const basketService = new BasketService();

export { basketService };
