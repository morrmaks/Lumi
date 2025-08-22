import { IProduct } from "@/models/productModel";
import { ICategoryProductDto } from "@/types/category";
import { ComponentType } from "@/types/product";

class CategoryProductDto implements ICategoryProductDto {
  id: string;
  image: string;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  discountPrice: number;
  componentType?: ComponentType;

  constructor(model: IProduct) {
    this.id = String(model._id);
    this.name = model.name;
    this.image = model.images[0];
    this.rating = model.rating;
    this.reviews = model.reviews;
    this.price = model.price;
    this.discountPrice = model.discountPrice;
    this.componentType = model.componentType;
  }
}

export { CategoryProductDto };
