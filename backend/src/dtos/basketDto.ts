import { IProduct } from "@/models/productModel";
import { ComponentType } from "@/types/product";
import { IBasketDto } from "@/types/basket";

class BasketDto implements IBasketDto {
  id: string;
  name: string;
  categorySlug: string;
  price: number;
  discountPrice: number;
  rating: number;
  reviews: number;
  image: string;

  constructor(model: IProduct, categorySlug: string) {
    this.id = String(model._id);
    this.name = model.name;
    this.image = model.images[0];
    this.price = model.price;
    this.discountPrice = model.discountPrice;
    this.rating = model.rating;
    this.reviews = model.reviews;
    this.categorySlug = categorySlug;
  }
}

export { BasketDto };
