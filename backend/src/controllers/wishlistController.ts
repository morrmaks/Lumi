import { NextFunction, Request, Response } from "express";
import { wishlistService } from "@/services/wishlistService";

class WishlistController {
  async getWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = (req as any).user;

      const productIds = await wishlistService.getWishlist(userId);

      return res.json(productIds);
    } catch (e) {
      next(e);
    }
  }

  async getWishlistProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const productIds = (req.query.ids as string).split(",");

      const products = await wishlistService.getWishlistProducts(productIds);

      return res.json(products);
    } catch (e) {
      next(e);
    }
  }

  async addProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = (req as any).user;
      const { productId } = req.body;

      const product = await wishlistService.addProduct(userId, productId);

      return res.json(product);
    } catch (e) {
      next(e);
    }
  }

  async addProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = (req as any).user;
      const { productIds } = req.body;

      const products = await wishlistService.addProducts(userId, productIds);

      return res.json(products);
    } catch (e) {
      next(e);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = (req as any).user;
      const { productId } = req.params;

      const deletedId = await wishlistService.deleteProduct(userId, productId);

      return res.json(deletedId);
    } catch (e) {
      next(e);
    }
  }

  async deleteProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = (req as any).user;
      const { productIds } = req.body;

      const deletedIds = await wishlistService.deleteProducts(
        userId,
        productIds,
      );

      return res.json(deletedIds);
    } catch (e) {
      next(e);
    }
  }

  async clearWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = (req as any).user;

      const data = await wishlistService.clearWishlist(userId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

const wishlistController = new WishlistController();

export { wishlistController };
