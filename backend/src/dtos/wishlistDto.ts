import { IProduct } from "@/models/productModel";
import { IWishlistDto } from "@/types/wishlist";

class WishlistDto implements IWishlistDto {
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
    this.categorySlug = categorySlug;
    this.price = model.price;
    this.discountPrice = model.discountPrice;
    this.rating = model.rating;
    this.reviews = model.reviews;
    this.image = model.images[0];
  }
}

export { WishlistDto };
