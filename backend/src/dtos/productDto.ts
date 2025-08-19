import { IProduct } from "@/models/productModel";
import { ComponentType, IProductDto } from "@/types/product";

class ProductDto implements IProductDto {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  price: number;
  discountPrice: number;
  rating: number;
  reviews: number;
  images: string[];
  quantity?: number;
  specs?: Record<string, string | number>;
  componentType?: ComponentType;

  constructor(model: IProduct) {
    this.id = String(model._id);
    this.name = model.name;
    this.description = model.description;
    this.categoryId = model.categoryId.toString();
    this.price = model.price;
    this.discountPrice = model.discountPrice;
    this.rating = model.rating;
    this.reviews = model.reviews;
    this.images = model.images;
    this.quantity = model.quantity;
    this.specs = model.specs;
    this.componentType = model.componentType;
  }
}

export { ProductDto };
