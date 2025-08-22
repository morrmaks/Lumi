import { NextFunction, Request, Response } from "express";
import { productService } from "@/services/productService";
import { categoryService } from "@/services/categoryService";

class ProductController {
  async getProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: productId } = req.params;

      const product = await productService.getProduct(productId);
      const breadcrumb = await categoryService.getCategoryBreadcrumb(
        product.categoryId,
      );

      return res.json({ product, breadcrumb });
    } catch (e) {
      next(e);
    }
  }

  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productService.getProducts();

      return res.json(products);
    } catch (e) {
      next(e);
    }
  }
}

const productController = new ProductController();

export { productController };
