import { BasketModel, IBasket } from "@/models/basketModel";
import mongoose from "mongoose";
import { IProduct } from "@/models/productModel";

class BasketService {
  async getBasket(userId: string): Promise<IBasket | null> {
    return await BasketModel.findOne({ userId })
      .populate<{ productIds: IProduct[] }>("items.productId")
      .exec();
  }

  async addProduct(userId: string, productId: string): Promise<IBasket> {
    let basket = await BasketModel.findOne({ userId });
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
    return await basket.save();
  }

  async addProducts(userId: string, productIds: string[]): Promise<IBasket> {
    let basket = await BasketModel.findOne({ userId });
    if (!basket) {
      basket = new BasketModel({
        userId,
        items: productIds.map((productId) => ({
          productId: new mongoose.Types.ObjectId(productId),
          quantity: 1,
        })),
      });
    } else {
      for (const productId of productIds) {
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
    }

    basket.updatedAt = new Date();
    return await basket.save();
  }

  async deleteProduct(userId: string, productId: string): Promise<IBasket> {
    let basket = await BasketModel.findOne({ userId });
    if (!basket) throw new Error("Корзина не найдена");

    basket.items = basket.items.filter(
      (item) => item.productId.toString() !== productId,
    );
    basket.updatedAt = new Date();
    return await basket.save();
  }

  async increaseQuantity(userId: string, productId: string) {
    let basket = await BasketModel.findOne({ userId });
    if (!basket) throw new Error("Корзина не найдена");

    const item = basket.items.find(
      (item) => item.productId.toString() === productId,
    );
    if (item) {
      item.quantity++;
    }

    basket.updatedAt = new Date();
    return await basket.save();
  }

  async decreaseQuantity(userId: string, productId: string): Promise<IBasket> {
    let basket = await BasketModel.findOne({ userId });
    if (!basket) throw new Error("Корзина не найдена");

    const item = basket.items.find(
      (item) => item.productId.toString() === productId,
    );
    if (item) {
      item.quantity--;
    }

    basket.updatedAt = new Date();
    return await basket.save();
  }

  async clearBasket(userId: string): Promise<IBasket> {
    let basket = await BasketModel.findOne({ userId });
    if (!basket) throw new Error("Корзина не найдена");

    basket.items = [];
    basket.updatedAt = new Date();
    return await basket.save();
  }
}

const basketService = new BasketService();

export { basketService };
