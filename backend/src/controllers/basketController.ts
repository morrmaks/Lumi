import { NextFunction, Request, Response } from "express";
import { basketService } from "@/services/basketService";

class BasketController {
  async getBasket(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = (req as any).user;

      const data = await basketService.getBasket(userId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async addProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = (req as any).user;
      const { productId } = req.body;

      const data = await basketService.addProduct(userId, productId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async addProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = (req as any).user;
      const { productIds } = req.body;

      const data = await basketService.addProducts(userId, productIds);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = (req as any).user;
      const { productId } = req.params;

      const data = await basketService.deleteProduct(userId, productId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async increaseQuantity(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = (req as any).user;
      const { productId } = req.params;

      const data = await basketService.increaseQuantity(userId, productId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async decreaseQuantity(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = (req as any).user;
      const { productId } = req.params;

      const data = await basketService.decreaseQuantity(userId, productId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async clearBasket(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = (req as any).user;

      const data = await basketService.clearBasket(userId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

const basketController = new BasketController();

export { basketController };
