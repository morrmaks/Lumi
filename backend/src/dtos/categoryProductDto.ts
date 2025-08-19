import { IProduct } from "@/models/productModel";
import { ICategoryProductDto } from "@/types/category";

class CategoryProductDto implements ICategoryProductDto {
  id: string;
  image: string;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  discountPrice: number;

  constructor(model: IProduct) {
    this.id = String(model._id);
    this.name = model.name;
    this.image = model.images[0];
    this.rating = model.rating;
    this.reviews = model.reviews;
    this.price = model.price;
    this.discountPrice = model.discountPrice;
  }
}

export { CategoryProductDto };
