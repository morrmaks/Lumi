import { CategoryModel, ICategory } from "@/models/categoryModel";
import mongoose, { mongo } from "mongoose";
import { IProduct, ProductModel } from "@/models/productModel";
import { CategoryProductDto } from "@/dtos/categoryProductDto";
import {
  ICategoryBreadcrumb,
  ICategoryDto,
  ICategoryProductDto,
} from "@/types/category";
import { CategoryDto } from "@/dtos/categoryDto";

class CategoryService {
  async getCategory(slug: string): Promise<ICategoryDto> {
    const category = await CategoryModel.findOne({ slug });

    if (!category) throw new Error("Категория не найдена");

    const productCount = await ProductModel.countDocuments({
      categoryId: category._id,
    });

    return new CategoryDto(category, productCount);
  }

  async getCategories(): Promise<ICategoryDto[]> {
    const categories = await CategoryModel.find().exec();

    const counts = await ProductModel.aggregate([
      { $group: { _id: "$categoryId", count: { $sum: 1 } } },
    ]);

    const countMap = counts.reduce(
      (acc, item) => {
        acc[item._id] = item.count;
        return acc;
      },
      {} as Record<string, number>,
    );

    return categories.map((category) => {
      const productCount = countMap[category._id.toString()] || 0;
      return new CategoryDto(category, productCount);
    });
  }

  async getProducts(
    categoryId: string,
    query: Record<string, any | undefined>,
  ): Promise<ICategoryProductDto[]> {
    const {
      field = "createdAt",
      order = "desc",
      page = 1,
      limit = 8,
      search,
    } = query;

    const filter: Record<string, any> = { categoryId };

    if (!mongoose.Types.ObjectId.isValid(categoryId))
      throw new Error("Неверный id категории");

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const products = await ProductModel.find(filter)
      .sort({ [field]: order === "asc" ? 1 : -1, _id: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    return products.map((product) => new CategoryProductDto(product));
  }

  async getCategoryBreadcrumb(
    categoryId: string,
  ): Promise<ICategoryBreadcrumb[]> {
    if (!mongoose.Types.ObjectId.isValid(categoryId))
      throw new Error("Неверный id категории");

    const stack: ICategoryBreadcrumb[] = [];
    let currentCategory = await CategoryModel.findById(categoryId);

    while (currentCategory) {
      stack.push({
        name: currentCategory.name,
        path: currentCategory.slug,
      });
      if (!currentCategory.parentId) break;
      currentCategory = await CategoryModel.findById(currentCategory.parentId);
    }

    const breadcrumb: ICategoryBreadcrumb[] = [
      { name: "Каталог", path: "/catalog" },
    ];
    let fullPath = "/catalog";
    for (let i = stack.length - 1; i >= 0; i--) {
      fullPath += `/${stack[i].path}`;
      breadcrumb.push({ name: stack[i].name, path: fullPath });
    }

    return breadcrumb;
  }
}

const categoryService = new CategoryService();

export { categoryService };
