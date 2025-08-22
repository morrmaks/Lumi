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
import { ApiError } from "@/exeptions/apiError";

class CategoryService {
  async getCategory(slug: string): Promise<ICategoryDto> {
    if (!slug) throw ApiError.BadRequest("Категория не была передана");

    const category = await CategoryModel.findOne({ slug });
    if (!category) throw ApiError.NotFound("Категория не найдена");

    const productCount = await ProductModel.countDocuments({
      categoryId: category._id,
    });

    return new CategoryDto(category, productCount);
  }

  async getCategories(): Promise<ICategoryDto[]> {
    const categories = await CategoryModel.find().exec();
    if (!categories.length) throw ApiError.NotFound("Категории не найдены");

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
  ): Promise<{ products: ICategoryProductDto[]; hasMore: boolean }> {
    if (!mongoose.Types.ObjectId.isValid(categoryId))
      throw ApiError.BadRequest("Неверный id категории");

    const category = await CategoryModel.findById(categoryId);
    if (!category) throw ApiError.NotFound("Категория не найдена");

    const {
      field = "createdAt",
      order = "desc",
      page = 1,
      limit = 8,
      search,
    } = query;

    const filter: Record<string, any> = { categoryId };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const totalCount = await ProductModel.countDocuments(filter);
    const hasMore = page * limit < totalCount;

    const products = await ProductModel.find(filter)
      .sort({ [field]: order === "asc" ? 1 : -1, _id: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    if (!products.length) throw ApiError.NotFound("Товары не найдены");

    const categoryProducts = products.map(
      (product) => new CategoryProductDto(product),
    );
    return {
      products: categoryProducts,
      hasMore,
    };
  }

  async getCategoryBreadcrumb(
    categoryId: string,
  ): Promise<ICategoryBreadcrumb[]> {
    if (!mongoose.Types.ObjectId.isValid(categoryId))
      throw ApiError.BadRequest("Неверный id категории");

    let currentCategory = await CategoryModel.findById(categoryId);
    if (!currentCategory) throw ApiError.NotFound("Категория не найдена");

    const stack: ICategoryBreadcrumb[] = [];

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
