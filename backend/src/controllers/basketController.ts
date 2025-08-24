import { NextFunction, Request, Response } from "express";
import { basketService } from "@/services/basketService";
import { wishlistService } from "@/services/wishlistService";

class BasketController {
  async getBasket(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = (req as any).user;

      const basketItems = await basketService.getBasket(userId);

      return res.json(basketItems);
    } catch (e) {
      next(e);
    }
  }

  async getBasketProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const productIds = (req.query.ids as string).split(",");

      const products = await basketService.getBasketProducts(productIds);

      return res.json(products);
    } catch (e) {
      next(e);
    }
  }

  async addProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = (req as any).user;
      const { productId } = req.body;

      const data = await basketService.addProduct(userId, productId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async addProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = (req as any).user;
      const { productItems } = req.body;

      const data = await basketService.addProducts(userId, productItems);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = (req as any).user;
      const { productId } = req.params;

      const data = await basketService.deleteProduct(userId, productId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async increaseQuantity(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = (req as any).user;
      const { productId } = req.params;

      const product = await basketService.increaseQuantity(userId, productId);

      return res.json(product);
    } catch (e) {
      next(e);
    }
  }

  async decreaseQuantity(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = (req as any).user;
      const { productId } = req.params;

      const product = await basketService.decreaseQuantity(userId, productId);

      return res.json(product);
    } catch (e) {
      next(e);
    }
  }

  async clearBasket(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = (req as any).user;

      const data = await basketService.clearBasket(userId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

const basketController = new BasketController();

export { basketController };
