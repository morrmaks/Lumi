import { NextFunction, Request, Response } from "express";
import { categoryService } from "@/services/categoryService";

class CategoryController {
  async getCategory(req: Request, res: Response, next: NextFunction) {
    const { id: categoryId } = req.params;
    try {
      const category = await categoryService.getCategory(categoryId);
      const breadcrumb = await categoryService.getCategoryBreadcrumb(
        category.id,
      );

      return res.json({ category, breadcrumb });
    } catch (e) {
      next(e);
    }
  }

  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await categoryService.getCategories();

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: categoryId } = req.params;
      const sortOptions = req.query;

      const data = await categoryService.getProducts(categoryId, sortOptions);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

const categoryController = new CategoryController();

export { categoryController };
