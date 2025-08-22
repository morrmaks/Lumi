import { ICategoryDto, ICategoryProductDto } from "@/types/category";
import { ICategory } from "@/models/categoryModel";

class CategoryDto implements ICategoryDto {
  id: string;
  name: string;
  description: string;
  slug: string;
  productCount: number;

  constructor(model: ICategory, productCount: number) {
    this.id = String(model._id);
    this.name = model.name;
    this.description = model.description;
    this.slug = model.slug;
    this.productCount = productCount;
  }
}

export { CategoryDto };
