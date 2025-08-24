import { BasketModel, IBasket } from "@/models/basketModel";
import mongoose from "mongoose";
import { IProduct, ProductModel } from "@/models/productModel";
import { IBasketDto } from "@/types/basket";
import { CategoryModel, ICategory } from "@/models/categoryModel";
import { BasketDto } from "@/dtos/basketDto";
import { ApiError } from "@/exeptions/apiError";

class BasketService {
  async getBasket(userId: string): Promise<IBasket["items"]> {
    const basket = await BasketModel.findOne({ userId }).select("items").exec();
    return basket?.items || [];
  }

  async getBasketProducts(productIds: string[]): Promise<IBasketDto[]> {
    if (!productIds.length)
      throw ApiError.BadRequest("Товары не были переданы");

    const products = await this._getValidProductsOrThrow(productIds);
    const categoryMap = await this._getCategoryMapProducts(products);

    return products.map(
      (product) =>
        new BasketDto(product, categoryMap[product.categoryId.toString()]),
    );
  }

  async addProduct(userId: string, productId: string): Promise<string> {
    const product = await ProductModel.findById(productId);
    if (!product) throw ApiError.NotFound("Товар не найден");
    let basket = await this._getOrCreateBasket(userId);

    const item = basket.items.find(
      (item) => item.productId.toString() === productId,
    );
    if (item) item.quantity++;
    else
      basket.items.push({
        productId: new mongoose.Types.ObjectId(productId),
        quantity: 1,
      });

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
    await this._getValidProductsOrThrow(productIds);

    let basket = await this._getOrCreateBasket(userId);
    const changedItems: IBasket["items"] = [];

    for (const item of productItems) {
      const existing = basket.items.find(
        (i) => i.productId.toString() === item.productId.toString(),
      );
      if (existing) existing.quantity += item.quantity;
      else {
        const newItem = {
          productId: new mongoose.Types.ObjectId(item.productId),
          quantity: item.quantity,
        };
        basket.items.push(newItem);
        changedItems.push(newItem);
      }
    }

    basket.updatedAt = new Date();
    await basket.save();
    return changedItems;
  }

  async deleteProduct(userId: string, productId: string): Promise<string> {
    const basket = await this._getBasketOrThrow(userId);
    const before = basket.items.length;
    basket.items = basket.items.filter(
      (i) => i.productId.toString() !== productId,
    );
    if (before === basket.items.length)
      throw ApiError.NotFound("Товар не найден в корзине");

    basket.updatedAt = new Date();
    await basket.save();
    return productId;
  }

  async increaseQuantity(userId: string, productId: string): Promise<string> {
    const { parent, item } = await this._getBasketItemOrThrow(
      userId,
      productId,
    );
    item.quantity++;
    parent.updatedAt = new Date();
    await parent.save();
    return productId;
  }

  async decreaseQuantity(userId: string, productId: string): Promise<string> {
    const { parent, item } = await this._getBasketItemOrThrow(
      userId,
      productId,
    );
    item.quantity--;
    parent.updatedAt = new Date();
    await parent.save();
    return productId;
  }

  async clearBasket(userId: string): Promise<IBasket> {
    const basket = await this._getBasketOrThrow(userId);
    basket.items = [];
    basket.updatedAt = new Date();
    return await basket.save();
  }

  private async _getBasketOrThrow(userId: string): Promise<IBasket> {
    let basket = await BasketModel.findOne<IBasket>({ userId });
    if (!basket) throw ApiError.NotFound("Корзина не найдена");
    return basket;
  }

  private async _getOrCreateBasket(userId: string): Promise<IBasket> {
    let basket = await BasketModel.findOne<IBasket>({ userId });
    if (!basket) basket = new BasketModel({ userId, items: [] });
    return basket;
  }

  private async _getValidProductsOrThrow(
    productIds: string[],
  ): Promise<IProduct[]> {
    const products = await ProductModel.find({ _id: { $in: productIds } });
    if (products.length !== productIds.length)
      throw ApiError.NotFound("Некоторые товары не найдены");
    return products;
  }

  private async _getBasketItemOrThrow(
    userId: string,
    productId: string,
  ): Promise<{ parent: IBasket; item: IBasket["items"][number] }> {
    const basket = await this._getBasketOrThrow(userId);
    const item = basket.items.find(
      (item) => item.productId.toString() === productId,
    );
    if (!item) throw ApiError.NotFound("Товар не найден в корзине");
    return { item, parent: basket };
  }

  private async _getCategoryMapProducts(
    products: IProduct[],
  ): Promise<Record<string, string>> {
    const categoryIds = [
      ...new Set(products.map((product) => product.categoryId)),
    ];
    const categories = await CategoryModel.find<ICategory>({
      _id: { $in: categoryIds },
    }).exec();
    return Object.fromEntries(
      categories.map((category) => [category._id, category.slug]),
    );
  }
}

const basketService = new BasketService();

export { basketService };
