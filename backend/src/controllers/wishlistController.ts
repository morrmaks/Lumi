import { NextFunction, Request, Response } from "express";
import { wishlistService } from "@/services/wishlistService";

class WishlistController {
  async getWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = (req as any).user;

      const data = await wishlistService.getWishlist(userId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async addProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = (req as any).user;
      const { productId } = req.body;

      const data = await wishlistService.addProduct(userId, productId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async addProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = (req as any).user;
      const { productIds } = req.body;

      const data = await wishlistService.addProducts(userId, productIds);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = (req as any).user;
      const { productId } = req.params;

      const data = await wishlistService.deleteProduct(userId, productId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async deleteProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = (req as any).user;
      const { productIds } = req.body;

      const data = await wishlistService.deleteProducts(userId, productIds);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async clearWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = (req as any).user;

      const data = await wishlistService.clearWishlist(userId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

const wishlistController = new WishlistController();

export { wishlistController };
